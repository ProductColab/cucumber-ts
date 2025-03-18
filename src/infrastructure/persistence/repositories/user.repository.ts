import { users, type User } from "../schema/schema";
import { eq } from "drizzle-orm";
import { Repository } from "@/domain/repositories/repository";
import { UserCreateInput, UserUpdateInput } from "@/domain/repositories/user.repository";
import db from "../sqlite";

export class UserRepository implements Repository<User, UserCreateInput, UserUpdateInput> {
  async create(data: UserCreateInput): Promise<User> {
    const [user] = await db.insert(users).values({
      email: data.email.toString(),
      name: data.name.toString()
    }).returning();
    return user;
  }

  async findById(id: number): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || null;
  }

  async update(id: number, data: UserUpdateInput): Promise<User | null> {
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
    return user || null;
  }

  async delete(id: number): Promise<boolean> {
    const [deleted] = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();
    return !!deleted;
  }

  async list(): Promise<User[]> {
    return db.select().from(users);
  }
}

export const userRepository = new UserRepository();