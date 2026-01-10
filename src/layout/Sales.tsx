import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Download, FunnelX, Pen } from "lucide-react";

import Button from "@/components/Button";
import { GenericDataTable } from "@/components/GenericDataTable";
import HeaderPage from "@/components/HeaderPage";
import Select from "@/components/Select";

import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import { useSales } from "@/hooks/useSales";
import type { Sale } from "@/types/sale";

export default function Sales() {
  const { sales, loading, downloadSalesCSV, isDownloading } = useSales();
  const { categories } = useCategories();
  const { products } = useProducts();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  // Create a map of ID and name
  const productMap = useMemo(() => {
    return new Map(products.map(p => [p.id, p.name]));
  }, [products]);

  // Filter sales by category or product
  const filteredSales = useMemo(() => {
    return sales.filter(sale => {
      const matchProduct = selectedProductId
        ? sale.product_id === selectedProductId
        : true;

      const matchCategory = selectedCategoryId
        ? products.find(p => p.id === sale.product_id)?.category_id ===
          selectedCategoryId
        : true;

      return matchProduct && matchCategory;
    });
  }, [sales, selectedProductId, selectedCategoryId, products]);

  function clearFilters() {
    setSelectedProductId(0);
    setSelectedCategoryId(0);
  }

  // Name of columns
  const productColumns = useMemo<ColumnDef<Sale>[]>(
    () => [
      {
        accessorKey: "product_id",
        header: "Produto",
        cell: ({ getValue }) =>
          productMap.get(getValue<number>()) || "Produto não encontrado"
      },
      {
        accessorKey: "date",
        header: "Mês",
        cell: ({ row }) =>
          new Date(row.original.date).toLocaleDateString("pt-BR", {
            month: "long",
            year: "numeric"
          })
      },
      { accessorKey: "quantity", header: "Quantidade" },
      {
        accessorKey: "total_price",
        header: "Valor Total",
        cell: ({ row }) =>
          new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          }).format(row.original.total_price)
      },
      {
        id: "actions",
        header: "Ações",
        cell: () => (
          <button className="cursor-pointer hover:text-primary transition-colors">
            <Pen className="size-5" />
          </button>
        )
      }
    ],
    [productMap]
  );

  return (
    <div className="flex flex-col gap-4 ">
      <HeaderPage text="Vendas">
        <Button
          loading={isDownloading}
          variant="secondary"
          onClick={() => downloadSalesCSV()}
        >
          <Download className="size-4" />
          Exportar CSV
        </Button>

        <Button
          disabled={!selectedProductId && !selectedCategoryId}
          onClick={() => clearFilters()}
        >
          <FunnelX className="size-4" />
          Limpar filtros
        </Button>
      </HeaderPage>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Select
          key={selectedCategoryId ? "cat-active" : "cat-empty"}
          dataSelect={categories}
          placeholder="Todas as categorias"
          setSelectedItem={val =>
            setSelectedCategoryId(val === "all" ? null : Number(val))
          }
        />
        <Select
          key={selectedProductId ? "prod-active" : "prod-empty"}
          dataSelect={products.filter(
            p => !selectedCategoryId || p.category_id === selectedCategoryId
          )}
          placeholder="Todos os produtos"
          setSelectedItem={val =>
            setSelectedProductId(val === "all" ? null : Number(val))
          }
        />
      </div>

      <GenericDataTable
        loading={loading}
        columns={productColumns}
        data={filteredSales}
      />
    </div>
  );
}
