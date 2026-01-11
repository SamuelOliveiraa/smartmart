import { API_URL } from "@/config/env";
import type { Product } from "@/types/product";

export const productsAPI = {
  get: () => fetch(`${API_URL}/products`).then(response => response.json()),
  getCsv: async () => {
    const response = await fetch(`${API_URL}/products/export_csv`);
    if (!response.ok) throw new Error("Failed to fetch CSV");
    return response.blob();
  },
  post: (product: Product) =>
    fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    }).then(response => response.json()),
  postCsv: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`${API_URL}/products/import_csv`, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error("Falha ao importar arquivo CSV no servidor");
    }

    return response.json();
  }
};
