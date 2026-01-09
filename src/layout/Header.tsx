import { Text } from "@/components/Text";
import type { ActiveTab } from "@/types/activeTab";
import {
  FolderOpen,
  LayoutDashboard,
  Package,
  ShoppingCart
} from "lucide-react";
import { tv } from "tailwind-variants";

interface HeaderProps {
  active: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

const listItemVariants = tv({
  base: "flex items-center gap-1 cursor-pointer pb-3 border-b border-transparent transition-all duration-100",
  variants: {
    active: {
      true: "border-blue-500 pb-3 text-blue-500",
      false: ""
    }
  },
  defaultVariants: {
    active: true
  }
});

export default function Header({ active, onTabChange }: HeaderProps) {
  return (
    <header className="w-full bg-background py-4 shadow-sm">
      <Text size="displayLarge" as="h1" className="max-w-6xl block mx-auto">
        SmartMart Dashboard
      </Text>

      <nav className="mt-4 pt-6 border-t border-border max-w-6xl mx-auto flex justify-between items-center">
        <ul className="flex items-center gap-6">
          <Text
            as="li"
            size="paragraphTiny"
            className={listItemVariants({ active: active === "dashboard" })}
            asChild
          >
            <button type="button" onClick={() => onTabChange("dashboard")}>
              <LayoutDashboard className="size-4" />
              Dashboard
            </button>
          </Text>
          <Text
            as="li"
            size="paragraphTiny"
            className={listItemVariants({ active: active === "products" })}
            asChild
          >
            <button type="button" onClick={() => onTabChange("products")}>
              <Package className="size-4" />
              Produtos
            </button>
          </Text>

          <Text
            as="li"
            size="paragraphTiny"
            className={listItemVariants({ active: active === "sales" })}
            asChild
          >
            <button type="button" onClick={() => onTabChange("sales")}>
              <ShoppingCart className="size-4" />
              Vendas
            </button>
          </Text>

          <Text
            as="li"
            size="paragraphTiny"
            className={listItemVariants({ active: active === "categories" })}
            asChild
          >
            <button type="button" onClick={() => onTabChange("categories")}>
              <FolderOpen className="size-4" />
              Categorias
            </button>
          </Text>
        </ul>
      </nav>
    </header>
  );
}
