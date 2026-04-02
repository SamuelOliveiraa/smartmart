import Button from "@/components/Button";
import { GenericDataTable } from "@/components/GenericDataTable";
import HeaderPage from "@/components/HeaderPage";
import AddProductModal from "@/components/modals/AddProductModal";
import Select from "@/components/Select";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import { delay } from "@/lib/delay";
import { notifyWorkInProgress } from "@/lib/notifyWorkInProgress";
import type { Product } from "@/types/product";
import type { ColumnDef } from "@tanstack/react-table";
import { Download, Pen, Upload } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

export default function Products() {
  const { products, loading, downloadProductsCSV, isDownloading } =
    useProducts();
  const { categories } = useCategories();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  const filteredProducts = useMemo(() => {
    if (!selectedCategoryId) return products;
    return products.filter(
      product => product.category_id === selectedCategoryId
    );
  }, [products, selectedCategoryId]);

  function handleSelectChange(value: string) {
    setSelectedCategoryId(value === "all" ? null : Number(value));
  }

  // function handleFileUpload() {}

  async function handleFileExport() {
    try {
      downloadProductsCSV();
      await delay(1000);
      toast.success("Arquivo exportado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao exportar arquivo!");
    }
  }

  const productColumns: ColumnDef<Product>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Nome" },
    { accessorKey: "category_id", header: "Categoria" },
    {
      accessorKey: "price",
      header: "Preço",
      cell: ({ row }) =>
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        }).format(row.original.price)
    },
    {
      id: "actions",
      header: "Ações",
      cell: () => (
        <button className="cursor-pointer" onClick={notifyWorkInProgress}>
          <Pen className="size-5" />
        </button>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-4" id="products">
      <div className="flex flex-col gap-4" id="products-options">
        <HeaderPage text="Produtos">
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="secondary"
              className="relative"
              onClick={notifyWorkInProgress}
            >
              <Upload className="size-4" />
              Upload CSV
            </Button>

            <Button
              variant="secondary"
              onClick={handleFileExport}
              loading={isDownloading}
            >
              <Download className="size-4" />
              Exportar CSV
            </Button>
          </div>

          <AddProductModal />
        </HeaderPage>

        <div className="flex md:hidden items-center justify-end  gap-4">
          <Button variant="secondary">
            <Upload className="size-4" />
            Upload CSV
          </Button>

          <Button
            variant="secondary"
            onClick={() => downloadProductsCSV()}
            loading={isDownloading}
          >
            <Download className="size-4" />
            Exportar CSV
          </Button>
        </div>

        <Select
          dataSelect={categories}
          placeholder="Todas as categorias"
          setSelectedItem={handleSelectChange}
        />
      </div>

      <GenericDataTable
        loading={loading}
        columns={productColumns}
        data={filteredProducts}
      />
    </div>
  );
}
