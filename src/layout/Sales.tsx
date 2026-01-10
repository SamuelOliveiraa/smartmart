import Button from "@/components/Button";
import { GenericDataTable } from "@/components/GenericDataTable";
import HeaderPage from "@/components/HeaderPage";
import Select from "@/components/Select";
import { useCategories } from "@/hooks/useCategories";
import { useSales } from "@/hooks/useSales";
import type { Sale } from "@/types/sale";
import type { ColumnDef } from "@tanstack/react-table";
import { Download, Pen } from "lucide-react";

export default function Sales() {
  const { sales, loading, downloadSalesCSV, isDownloading } = useSales();
  const { categories } = useCategories();

  const productColumns: ColumnDef<Sale>[] = [
    { accessorKey: "product_id", header: "Produto" },
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
        <button
          className="cursor-pointer"
          onClick={() => console.log("não da!")}
        >
          <Pen className="size-5" />
        </button>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <HeaderPage text="Vendas">
        <Button
          loading={isDownloading}
          variant="secondary"
          onClick={() => downloadSalesCSV()}
        >
          <Download className="size-4" />
          Exportar CSV
        </Button>
      </HeaderPage>

      <div className="flex flex-col sm:flex-row items-center gap-4 ">
        <Select
          dataSelect={categories}
          placeholder="Todas as categorias"
          setSelectedItem={() => {}}
        />
        <Select
          dataSelect={categories}
          placeholder="Todas as categorias"
          setSelectedItem={() => {}}
        />
      </div>

      <GenericDataTable
        loading={loading}
        columns={productColumns}
        data={sales}
      />
    </div>
  );
}
