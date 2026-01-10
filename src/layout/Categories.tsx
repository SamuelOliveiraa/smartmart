import Button from "@/components/Button";
import { GenericDataTable } from "@/components/GenericDataTable";
import HeaderPage from "@/components/HeaderPage";
import { useCategories } from "@/hooks/useCategories";
import type { Category } from "@/types/category";
import type { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";

export default function Categories() {
  const { categories, loading } = useCategories();

  const productColumns: ColumnDef<Category>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Nome" }
  ];

  return (
    <div className="flex flex-col gap-4">
      <HeaderPage text="Categorias">
        <Button>
          <Plus className="size-4" />
          Nova Categoria
        </Button>
      </HeaderPage>

      <GenericDataTable
        loading={loading}
        columns={productColumns}
        data={categories}
      />
    </div>
  );
}
