export interface Repository<T, CreateInput, UpdateInput> {
  create(data: CreateInput): Promise<T>;
  findById(id: number): Promise<T | null>;
  update(id: number, data: UpdateInput): Promise<T | null>;
  delete(id: number): Promise<boolean>;
  list(): Promise<T[]>;
}
