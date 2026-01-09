import Button from "@/components/Button";
import { GenericDataTable } from "@/components/GenericDataTable";
import HeaderPage from "@/components/HeaderPage";
import type { Category } from "@/types/category";
import type { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";

export default function Categories() {
  const productColumns: ColumnDef<Category>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Nome" }
  ];

  const myProducts = [
    {
      id: "1",
      name: "Teclado Mecânico RGB"
    },
    {
      id: "2",
      name: "Mouse Gamer 12000 DPI"
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <HeaderPage text="Categorias">
        <Button>
          <Plus className="size-4" />
          Nova Categoria
        </Button>
      </HeaderPage>
      <div className="mt-10">
        <GenericDataTable columns={productColumns} data={myProducts} />
      </div>
    </div>
  );
}
