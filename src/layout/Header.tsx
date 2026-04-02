import { Text } from "@/components/Text";
import type { ActiveTab } from "@/types/activeTab";
import {
  CircleQuestionMark,
  FolderOpen,
  LayoutDashboard,
  Package,
  ShoppingCart
} from "lucide-react";
import { tv } from "tailwind-variants";

interface HeaderProps {
  active: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onManualStartTour: () => void;
}

const listItemVariants = tv({
  base: "flex items-center gap-1 cursor-pointer pb-3 border-b border-transparent transition-all duration-100 flex-shrink-0 e whitespace-nowrap",
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

export default function Header({
  active,
  onTabChange,
  onManualStartTour
}: HeaderProps) {
  const links = [
    {
      label: "Dashboard",
      href: "dashboard",
      icon: LayoutDashboard,
      onClick: () => onTabChange("dashboard")
    },
    {
      label: "Produtos",
      href: "products",
      icon: Package,
      onClick: () => onTabChange("products")
    },
    {
      label: "Vendas",
      href: "sales",
      icon: ShoppingCart,
      onClick: () => onTabChange("sales")
    },
    {
      label: "Categorias",
      href: "categories",
      icon: FolderOpen,
      onClick: () => onTabChange("categories")
    }
  ];

  return (
    <header className="w-full bg-background py-4 shadow-sm" id="header">
      <div className="max-w-6xl mx-auto flex items-center justify-between w-full px-2 lg:p-0">
        <Text size="displayLarge" as="h1" className="text-center xl:text-start">
          SmartMart Dashboard
        </Text>

        <CircleQuestionMark
          className="size-6 cursor-pointer"
          onClick={onManualStartTour}
        />
      </div>

      <nav className="mt-4 pt-6 border-t border-border max-w-6xl mx-auto flex items-center overflow-x-auto">
        <ul
          className="w-full flex items-center gap-6 px-10 sm:px-0 sm:justify-center xl:justify-start min-w-lg sm:min-w-auto"
          id="navigation"
        >
          {links.map(link => (
            <Text
              key={link.href}
              as="li"
              size="paragraphTiny"
              className={listItemVariants({ active: active === link.href })}
              asChild
            >
              <button
                id={`link-${link.href}`}
                type="button"
                onClick={link.onClick}
              >
                <link.icon className="size-4" />
                {link.label}
              </button>
            </Text>
          ))}
        </ul>
      </nav>
    </header>
  );
}
