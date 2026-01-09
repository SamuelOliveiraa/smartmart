import Button from "@/components/Button";
import HeaderPage from "@/components/HeaderPage";
import { Download, Plus, Upload } from "lucide-react";

export default function Products() {
  return (
    <div className="flex flex-col gap-4">
      <HeaderPage text="Produtos">
        <Button variant="secondary">
          <Upload className="size-4" />
          Upload CSV
        </Button>

        <Button variant="secondary">
          <Download className="size-4" />
          Exportar CSV
        </Button>

        <Button>
          <Plus className="size-4" />
          Cadastrar Produto
        </Button>
      </HeaderPage>
      <p>Welcome to the Products Dashboard!</p>
    </div>
  );
}
