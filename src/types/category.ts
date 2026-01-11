export interface Category {
  id: number;
  name: string;
}

export type CategoryPost = Omit<Category, "id">;
