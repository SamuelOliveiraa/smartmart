import { API_URL } from "@/config/env";

export const salesAPI = {
  get: () => fetch(`${API_URL}/sales`).then(response => response.json()),
  getCSV: async () => {
    const response = await fetch(`${API_URL}/sales/export_csv`);
    if (!response.ok) throw new Error("Failed to fetch CSV");
    return response.blob();
  }
};
