import { GenericDataTable } from "@/components/GenericDataTable";
import HeaderPage from "@/components/HeaderPage";
import AddCategoryModal from "@/components/modals/AddCategoryModal";
import { useCategories } from "@/hooks/useCategories";
import type { Category } from "@/types/category";
import type { ColumnDef } from "@tanstack/react-table";

export default function Categories() {
  const { categories, loading } = useCategories();

  const productColumns: ColumnDef<Category>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Nome" }
  ];

  return (
    <div className="flex flex-col gap-4" id="categories">
      <HeaderPage text="Categorias" id="categories-options">
        <AddCategoryModal />
      </HeaderPage>

      <GenericDataTable
        loading={loading}
        columns={productColumns}
        data={categories}
      />
    </div>
  );
}
