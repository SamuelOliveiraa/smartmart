import { productsAPI } from "@/api/productsAPI";
import { queryClient } from "@/main";
import type { Product } from "@/types/product";
import { useMutation, useQuery } from "@tanstack/react-query";

interface UploadResponse {
  message: string;
  success: boolean;
}

export const useProducts = () => {
  const productsQuery = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: () => productsAPI.get(),
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  const createProduct = useMutation<Product, Error, Product>({
    mutationFn: (newProduct: Product) => productsAPI.post(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });

  const uploadProductsCSV = useMutation<UploadResponse, Error, File>({
    mutationFn: file => productsAPI.postCsv(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });

  const downloadProductsCSV = useMutation({
    mutationFn: productsAPI.getCsv,
    onSuccess: blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "produtos.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    }
  });

  return {
    products: productsQuery.data ?? [],
    loading: productsQuery.isLoading,
    error: productsQuery.isError,
    createProduct: createProduct.mutate,
    isSaving: createProduct.isPending,
    downloadProductsCSV: downloadProductsCSV.mutate,
    isDownloading: downloadProductsCSV.isPending,
    uploadProductsCSV: uploadProductsCSV.mutate,
    isUploading: uploadProductsCSV.isPending
  };
};
