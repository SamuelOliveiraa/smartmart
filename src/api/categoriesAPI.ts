import { API_URL } from "@/config/env";
import type { CategoryPost } from "@/types/category";

export const categoriesAPI = {
  get: () => fetch(`${API_URL}/categories`).then(response => response.json()),
  post: (data: CategoryPost) =>
    fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
};
