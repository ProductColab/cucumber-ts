import { User } from '../entities/user';
import { Email } from '../value-objects/email';
import { Name } from '../value-objects/name';

export interface UserCreateInput {
  email: Email;
  name: Name;
}

export interface UserUpdateInput {
  name: Name;
  email: Email;
}

export interface UserRepository {
  create(input: UserCreateInput): Promise<User>;
  update(id: number, input: UserUpdateInput): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  delete(id: number): Promise<boolean>;
  list(): Promise<User[]>;
}
