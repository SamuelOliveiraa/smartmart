import { API_URL } from "@/config/env";
import type { ProductPost } from "@/types/product";

export const productsAPI = {
  get: () => fetch(`${API_URL}/products`).then(response => response.json()),
  getCsv: async () => {
    const response = await fetch(`${API_URL}/products/export_csv`);
    if (!response.ok) throw new Error("Failed to fetch CSV");
    return response.blob();
  },
  post: (product: ProductPost) =>
    fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    }).then(response => response.json())
};
