export class Name {
  private constructor(private readonly value: string) { }

  static create(name: string): Name {
    if (!this.isValid(name)) {
      throw new Error('Invalid name format');
    }
    return new Name(name);
  }

  private static isValid(name: string): boolean {
    return name.length >= 2 && name.length <= 100;
  }

  toString(): string {
    return this.value;
  }

  equals(other: Name): boolean {
    return this.value === other.value;
  }
} 