import { Email } from '../value-objects/email';
import { Name } from '../value-objects/name';

export class User {
  private constructor(
    public readonly id: number,
    public readonly email: Email,
    public readonly name: Name,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) { }

  static create(email: string, name: string): User {
    const now = new Date();
    return new User(
      0,
      Email.create(email),
      Name.create(name),
      now,
      now
    );
  }

  static fromDb(data: { id: number; email: string; name: string; created_at: Date; updated_at: Date }): User {
    return new User(
      data.id,
      Email.create(data.email),
      Name.create(data.name),
      new Date(data.created_at),
      new Date(data.updated_at)
    );
  }

  update(name: string): User {
    return new User(
      this.id,
      this.email,
      Name.create(name),
      this.createdAt,
      new Date()
    );
  }

  getEmail(): string {
    return this.email.toString();
  }

  getName(): string {
    return this.name.toString();
  }
} 