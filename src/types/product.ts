export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category_id: number;
  brand?: string;
}

export type ProductPost = Omit<Product, "id">;
