import Button from "@/components/Button";
import { GenericDataTable } from "@/components/GenericDataTable";
import HeaderPage from "@/components/HeaderPage";
import type { Sale } from "@/types/sale";
import type { ColumnDef } from "@tanstack/react-table";
import { Download, Pen } from "lucide-react";

export default function Sales() {
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

  const myProducts = [
    {
      id: "1",
      product_id: "Notebook Dell",
      quantity: 10,
      total_price: 23599,
      date: "2023-01-10"
    },
    {
      id: "2",
      product_id: "2",
      quantity: 10,
      total_price: 2599,
      date: "2023-01-10"
    }
  ];
  return (
    <div className="flex flex-col gap-4">
      <HeaderPage text="Vendas">
        <Button variant="secondary">
          <Download className="size-4" />
          Exportar CSV
        </Button>
      </HeaderPage>

      <div className="mt-10">
        <GenericDataTable columns={productColumns} data={myProducts} />
      </div>
    </div>
  );
}
