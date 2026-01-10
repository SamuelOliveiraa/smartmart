import { API_URL } from "@/config/env";
import type { Category } from "@/types/category";

export const categoriesAPI = {
  get: () => fetch(`${API_URL}/categories`).then(response => response.json()),
  post: (category: Category) =>
    fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(category)
    }).then(response => response.json())
};
