import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { users } from "@/infrastructure/persistence/schema/schema";
import { userRepository } from "@/infrastructure/persistence/repositories/user.repository";
import db from "@/infrastructure/persistence/sqlite";
import { Email } from "@/domain/value-objects/email";
import { Name } from "@/domain/value-objects/name";
import { UserRepository } from "@/domain/repositories/user.repository";
import { User } from "@/domain/entities/user";

export interface DbWorld extends World {
  db: typeof db;
  userRepository: UserRepository;
  testUser: User | null;
  testUsers: User[];
  deletedUserId: User["id"] | null;
}

export class DbWorld extends World {
  constructor(options: IWorldOptions) {
    super(options);
    this.db = db;
    this.userRepository = userRepository;
    this.testUser = null;
    this.testUsers = [];
    this.deletedUserId = null;
  }

  async cleanDatabase() {
    await this.db.delete(users);
    this.testUser = null;
    this.testUsers = [];
  }

  async createTestUser(email: string, name: string) {
    this.testUser = await this.userRepository.create({ email: Email.create(email), name: Name.create(name) });
    return this.testUser;
  }

  async findUserById(id: number) {
    this.testUser = await this.userRepository.findById(id);
    return this.testUser;
  }

  async findUserByEmail(email: string) {
    this.testUser = await this.userRepository.findByEmail(Email.create(email));
    return this.testUser;
  }

  async updateTestUser(id: number, data: any) {
    this.testUser = await this.userRepository.update(id, data);
    return this.testUser;
  }

  async deleteTestUser(id: number) {
    await this.userRepository.delete(id);
    this.testUser = null;
  }

  async listAllUsers() {
    this.testUsers = await this.userRepository.list();
    return this.testUsers;
  }
}

setWorldConstructor(DbWorld); 