"use client";

import { useRef } from "react";
import { driver, type Driver } from "driver.js";
import "driver.js/dist/driver.css";
import type { ActiveTab } from "@/types/activeTab";

export function Tour({
  handleTabChange
}: {
  handleTabChange: (activeTab: ActiveTab) => void;
}) {
  const driverRef = useRef<Driver | null>(null);

  const startTour = () => {
    driverRef.current = driver({
      showProgress: true,
      nextBtnText: "Próximo",
      prevBtnText: "Anterior",
      doneBtnText: "Finalizar",
      steps: [
        {
          element: "#header",
          popover: {
            title: "Bem-vindo ao Dahsboard da SmartMart!",
            description:
              "Este é o início da sua jornada na nossa plataforma. Vamos lhe apresentar tudo por aqui.",
            side: "bottom",
            align: "center",
            onNextClick: () => {
              handleTabChange("dashboard");
              setTimeout(() => {
                driverRef.current?.moveNext();
              }, 100);
            }
          }
        },
        {
          element: "#navigation",
          popover: {
            title: "Navegação Rápida",
            description:
              "É por aqui que voce pode navegar entre as seções da plataforma de forma rápida e facil.",
            side: "bottom",
            align: "start"
          }
        },
        {
          element: "#dashboard",
          popover: {
            title: "Dashboard",
            description:
              "Aqui estão os dados das suas vendas e lucros por mes.",
            side: "bottom",
            align: "start"
          }
        },
        {
          element: "#dashboard-options",
          popover: {
            title: "Filtros por Categoria",
            description:
              "Aqui você pode filtrar as vendas e lucros por categoria. E ver os produtos mais vendidos, lucro total e total de vendas.",
            side: "bottom",
            align: "start",
            onNextClick: () => {
              handleTabChange("products");
              setTimeout(() => {
                driverRef.current?.moveNext();
              }, 100);
            }
          }
        },
        {
          element: "#products",
          popover: {
            title: "Produtos",
            description:
              "Aqui são todos os seus produtos cadastrados. Eles contem um identificador unico, o nome, a categoria a qual ele pertence e o preço unitario.",
            side: "bottom",
            align: "start",
            onPrevClick: () => {
              handleTabChange("dashboard");
              setTimeout(() => {
                driverRef.current?.movePrevious();
              }, 100);
            }
          }
        },
        {
          element: "#products-options",
          popover: {
            title: "Filtros de Produtos",
            description:
              "Aqui você pode filtrar os produtos por categoria. Cadastrar um novo produto, exportar os produtos para um arquivo CSV ou importar produtos de um arquivo CSV.",
            side: "bottom",
            align: "start",
            onNextClick: () => {
              handleTabChange("sales");
              setTimeout(() => {
                driverRef.current?.moveNext();
              }, 100);
            }
          }
        },
        {
          element: "#sales",
          popover: {
            title: "Vendas",
            description:
              "Aqui é a sua seção de vendas. Assim como na aba de produtos, todas as suas vendas estão cadastradas e organizadas por todos os produtos vendidos no mês, com o nome do produto vendido, quantidade e valor total.",
            side: "bottom",
            align: "start",
            onPrevClick: () => {
              handleTabChange("products");
              setTimeout(() => {
                driverRef.current?.movePrevious();
              }, 100);
            }
          }
        },
        {
          element: "#sales-options",
          popover: {
            title: "Filtros de Vendas",
            description:
              "Aqui você filtrar tanto por categoria tanto por produto, para uma melhorar visualização. E tambem pode exportar todos os produtos para um arquivo CSV.",
            side: "bottom",
            align: "start",
            onNextClick: () => {
              handleTabChange("categories");
              setTimeout(() => {
                driverRef.current?.moveNext();
              }, 100);
            }
          }
        },
        {
          element: "#categories",
          popover: {
            title: "Categorias",
            description:
              "Por ultimo, aqui é a sua seção de categorias. Aqui você pode visualizar as categorias existentes e adicionar novas categorias para organizar melhor os seus produtos.",
            side: "bottom",
            align: "start",
            onPrevClick: () => {
              handleTabChange("sales");
              setTimeout(() => {
                driverRef.current?.movePrevious();
              }, 100);
            }
          }
        }
      ]
    });

    driverRef.current.drive();
  };

  return { startTour };
}
