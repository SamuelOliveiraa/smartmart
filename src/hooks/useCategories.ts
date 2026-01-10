import { categoriesAPI } from "@/api/categoriesAPI";
import { queryClient } from "@/main";
import type { Category } from "@/types/category";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  const categoriesQuery = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: () => categoriesAPI.get(),
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  const createCategory = useMutation<Category, Error, Category>({
    mutationFn: (newCategory: Category) => categoriesAPI.post(newCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
  });

  return {
    categories: categoriesQuery.data ?? [],
    loading: categoriesQuery.isLoading,
    error: categoriesQuery.error,
    createCategory: createCategory.mutate,
    isSaving: createCategory.isPending
  };
};
