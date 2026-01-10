import { salesAPI } from "@/api/salesAPI";
import type { Sale } from "@/types/sale";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSales = () => {
  const salesQuery = useQuery<Sale[], Error>({
    queryKey: ["sales"],
    queryFn: () => salesAPI.get(),
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  const downloadSalesCSV = useMutation({
    mutationFn: salesAPI.getCSV,
    onSuccess: blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "sales.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    }
  });

  return {
    sales: salesQuery.data ?? [],
    loading: salesQuery.isLoading,
    error: salesQuery.error,
    downloadSalesCSV: downloadSalesCSV.mutate,
    isDownloading: downloadSalesCSV.isPending
  };
};
