import { users } from "../schema/schema";
import { eq } from "drizzle-orm";
import { Repository } from "@/domain/repositories/repository";
import { UserCreateInput, UserUpdateInput } from "@/domain/repositories/user.repository";
import db from "../sqlite";
import { User } from "@/domain/entities/user";

export class UserRepository implements Repository<User, UserCreateInput, UserUpdateInput> {
  private toDomain(dbUser: any): User {
    return User.fromDb(dbUser);
  }

  async create(data: UserCreateInput): Promise<User> {
    const [user] = await db.insert(users).values({
      email: data.email.toString(),
      name: data.name.toString()
    }).returning();
    return this.toDomain(user);
  }

  async findById(id: number): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user ? this.toDomain(user) : null;
  }

  async findByEmail(email: UserCreateInput["email"]): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.email, email.toString()));
    return user ? this.toDomain(user) : null;
  }

  async update(id: number, data: UserUpdateInput): Promise<User> {
    const updateData: any = {};

    if (data.name) {
      updateData.name = data.name.toString();
    }
    if (data.email) {
      updateData.email = data.email.toString();
    }

    const [user] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning();

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    return this.toDomain(user);
  }

  async delete(id: number): Promise<boolean> {
    const [deleted] = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();
    return !!deleted;
  }

  async list(): Promise<User[]> {
    const dbUsers = await db.select().from(users);
    return dbUsers.map(user => this.toDomain(user));
  }
}

export const userRepository = new UserRepository();