import DashboardCard from "@/components/DashboardCard";
import HeaderPage from "@/components/HeaderPage";
import Select from "@/components/Select";
import { Text } from "@/components/Text";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from "@/components/ui/chart";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import { useSales } from "@/hooks/useSales";
import { formatCurrencyBRL } from "@/lib/formatCurrencyBRL";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis
} from "recharts";

export default function Dashboard() {
  const { categories } = useCategories();
  const { products } = useProducts();
  const { sales } = useSales();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  const processData = (salesData: any[]) => {
    const monthlyData: Record<
      string,
      { month: string; sales: number; profit: number; monthIndex: number }
    > = {};

    salesData.forEach(item => {
      const date = new Date(item.date);
      const monthName = date
        .toLocaleString("pt-BR", { month: "short" })
        .toUpperCase();
      const monthIndex = date.getMonth(); // Janeiro é 0, Fevereiro é 1...

      if (!monthlyData[monthName]) {
        monthlyData[monthName] = {
          month: monthName,
          sales: 0,
          profit: 0,
          monthIndex: monthIndex // Guardamos o índice para ordenar depois
        };
      }

      monthlyData[monthName].sales += item.quantity;
      monthlyData[monthName].profit += item.total_price;
    });

    // Transforma em array e ordena pelo monthIndex (0 a 11)
    return Object.values(monthlyData).sort(
      (a, b) => a.monthIndex - b.monthIndex
    );
  };

  const filteredSales = useMemo(() => {
    if (!selectedCategoryId) return sales;

    const productCategoryMap = new Map(
      products.map(p => [p.id, p.category_id])
    );

    return sales.filter(
      sale => productCategoryMap.get(sale.product_id) === selectedCategoryId
    );
  }, [sales, products, selectedCategoryId]);

  const data = processData(filteredSales);

  // Total acumulado
  const totalProfit = data.reduce((acc, curr) => acc + curr.profit, 0);

  // Vendas Totais do Ano
  const totalQty = filteredSales.reduce((acc, curr) => acc + curr.quantity, 0);

  // Produto mais vendido
  const getMostSoldProduct = () => {
    if (filteredSales.length === 0) return "Nenhum";

    // Criamos um mapa de quantidade por produto:
    const productMap: Record<number, number> = {};

    filteredSales.forEach(sale => {
      productMap[sale.product_id] =
        (productMap[sale.product_id] || 0) + sale.quantity;
    });

    const mostSoldId = Object.keys(productMap).reduce((a, b) =>
      productMap[Number(a)] > productMap[Number(b)] ? a : b
    );

    // Buscamos o nome desse produto na sua lista de produtos
    const product = products.find(p => p.id === Number(mostSoldId));
    return product?.name || "Desconhecido";
  };

  const topProduct = getMostSoldProduct();

  const chartConfig = {
    sales: {
      label: "Qtd. Vendida",
      color: "#006fee"
    },
    profit: {
      label: "Lucro", // Isso muda o texto que aparece no Tooltip
      color: "#10b981" // Cor verde para o lucro
    }
  } satisfies ChartConfig;

  return (
    <div className="flex flex-col gap-6">
      <HeaderPage text="Dashboard"></HeaderPage>

      <Select
        dataSelect={categories}
        placeholder="Todas as categorias"
        setSelectedItem={val =>
          setSelectedCategoryId(val === "all" ? null : Number(val))
        }
      />

      <div className="flex gap-4">
        <DashboardCard
          type="sales"
          title="Vendas totais"
          text={String(totalQty)}
        />
        <DashboardCard
          type="profit"
          title="Lucro total"
          text={formatCurrencyBRL(String(totalProfit.toFixed(2)))}
        />
        <DashboardCard
          type="mostSold"
          title="Produtos mais vendidos"
          text={topProduct}
        />
      </div>

      <div className="flex gap-4">
        <div className="max-w-2xl flex-1 bg-background shadow-sm p-4 border rounded-lg">
          <Text
            className="border-b border-border pb-4 mb-6 block w-full"
            size="displaySmall"
          >
            Quantidade vendida por mês
          </Text>

          <div className="w-full">
            <ChartContainer config={chartConfig}>
              <BarChart data={data} margin={{ top: 30, right: 40 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={true}
                  tickLine={false}
                  tickMargin={10}
                />
                <YAxis tickLine={true} axisLine={true} tickMargin={10} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="sales"
                  fill="var(--color-sales)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </div>

        <div className="max-w-2xl flex-1 bg-background shadow-sm p-4 border rounded-lg">
          <Text
            className="border-b border-border pb-4 mb-6 block w-full"
            size="displaySmall"
          >
            Lucro total por mês
          </Text>

          <div className="w-full">
            <ChartContainer config={chartConfig}>
              <LineChart data={data} margin={{ top: 30, right: 40 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={true}
                  tickLine={false}
                  tickMargin={8}
                />
                <YAxis tickLine={true} axisLine={true} tickMargin={10} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="text-green-700"
                      formatter={value => {
                        const formattedValue = new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL"
                        }).format(Number(value));

                        return `Lucro: ${formattedValue}`;
                      }}
                    />
                  }
                />
                <Line
                  dataKey="profit"
                  type="natural"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={true}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
