import { Award, DollarSign, TrendingUp } from "lucide-react";
import { Text } from "./Text";
import { tv } from "tailwind-variants";

const CardVariants = tv({
  base: "flex items-center justify-center rounded-md p-3",
  variants: {
    type: {
      sales: "bg-blue-100",
      profit: "bg-green-100",
      mostSold: "bg-purple-100"
    }
  },
  defaultVariants: {
    type: "sales"
  }
});

const CardIcon = ({ type }: { type: "sales" | "profit" | "mostSold" }) => {
  switch (type) {
    case "sales":
      return <TrendingUp className="size-6 text-blue-600" />;
    case "profit":
      return <DollarSign className="size-6 text-green-600" />;
    case "mostSold":
      return <Award className="size-6 text-purple-600" />;
  }
};

export default function DashboardCard({
  title,
  text,
  type
}: {
  title: string;
  text: string;
  type: "sales" | "profit" | "mostSold";
}) {
  return (
    <div className="flex flex-1 items-center gap-4 rounded-md bg-background p-6 max-w-96 shadow-sm">
      <div className={CardVariants({ type })}>
        <CardIcon type={type} />
      </div>

      <div className="flex flex-col gap-2">
        <Text size="paragraphSmall" className="opacity-50">
          {title}
        </Text>

        <Text size="displayLarge" className="w-full max-w-50 truncate">
          {text}
        </Text>
      </div>
    </div>
  );
}
