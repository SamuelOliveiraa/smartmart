import Button from "@/components/Button";
import { GenericDataTable } from "@/components/GenericDataTable";
import HeaderPage from "@/components/HeaderPage";
import AddProductModal from "@/components/modals/AddProductModal";
import Select from "@/components/Select";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import type { Product } from "@/types/product";
import type { ColumnDef } from "@tanstack/react-table";
import { Download, Pen, Upload } from "lucide-react";
import { useMemo, useState } from "react";

export default function Products() {
  const {
    products,
    loading,
    downloadProductsCSV,
    uploadProductsCSV,
    isDownloading,
    isUploading
  } = useProducts();
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
        <button
          className="cursor-pointer"
          onClick={() => console.log("não da!")}
        >
          <Pen className="size-5" />
        </button>
      )
    }
  ];

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      alert("Por favor, selecione um arquivo CSV.");
      return;
    }

    uploadProductsCSV(file, {
      onSuccess: () => {
        alert("Arquivo CSV importado com sucesso!");
        event.target.value = "";
      },
      onError: error => {
        alert(`Erro ao importar arquivo CSV: ${error}`);
      }
    });

    const formData = new FormData();
    formData.append("file", file);
  }

  return (
    <div className="flex flex-col gap-4">
      <HeaderPage text="Produtos">
        <div className="hidden md:flex items-center gap-4">
          <Button variant="secondary" className="relative">
            <input
              id="csvFile"
              type="file"
              className="absolute top-0 left-0 w-full h-full z-10 opacity-0 cursor-pointer"
              accept=".csv, text/csv, application/vnd.ms-excel"
              onChange={handleFileChange}
            />
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

      <GenericDataTable
        loading={loading}
        columns={productColumns}
        data={filteredProducts}
      />
    </div>
  );
}
