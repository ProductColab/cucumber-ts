import { UserCreateInput, UserRepository, UserUpdateInput } from '@/domain/repositories/user.repository';
import { User } from '../../domain/entities/user';
import { Email } from '../../domain/value-objects/email';
import { Name } from '../../domain/value-objects/name';

export class UserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserError';
  }
}

export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  async createUser(email: string, name: string): Promise<User> {
    try {
      const createInput: UserCreateInput = {
        email: Email.create(email),
        name: Name.create(name)
      };
      return await this.userRepository.create(createInput);
    } catch (error) {
      if (error instanceof Error) {
        throw new UserError(`Failed to create user: ${error.message}`);
      }
      throw new UserError('Failed to create user: Unknown error');
    }
  }

  async updateUser(id: number, name: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new UserError(`User with id ${id} not found`);
      }

      const updateInput: UserUpdateInput = {
        name: Name.create(name),
        email: user.email
      };
      return await this.userRepository.update(id, updateInput);
    } catch (error) {
      if (error instanceof UserError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new UserError(`Failed to update user: ${error.message}`);
      }
      throw new UserError('Failed to update user: Unknown error');
    }
  }

  async getUser(id: number): Promise<User | null> {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new UserError(`Failed to get user: ${error.message}`);
      }
      throw new UserError('Failed to get user: Unknown error');
    }
  }

  async listUsers(): Promise<User[]> {
    try {
      return await this.userRepository.list();
    } catch (error) {
      if (error instanceof Error) {
        throw new UserError(`Failed to list users: ${error.message}`);
      }
      throw new UserError('Failed to list users: Unknown error');
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new UserError(`User with id ${id} not found`);
      }
      return await this.userRepository.delete(id);
    } catch (error) {
      if (error instanceof UserError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new UserError(`Failed to delete user: ${error.message}`);
      }
      throw new UserError('Failed to delete user: Unknown error');
    }
  }
} 