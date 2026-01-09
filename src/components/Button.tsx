import { Loader2 } from "lucide-react";
import { tv } from "tailwind-variants";
import { Text } from "./Text";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  loading?: boolean;
};

const buttonVariants = tv({
  base: "w-fit py-2 px-3 flex items-center justify-center gap-2 rounded-lg cursor-pointer transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 border border-gray-300 cursor-pointer",
  variants: {
    variant: {
      primary: "bg-brand-blue text-secondary hover:bg-blue-700",
      secondary: "hover:bg-gray-50"
    },
    loading: {
      true: "cursor-not-allowed opacity-60"
    }
  },
  defaultVariants: {
    variant: "primary",
    loading: false
  }
});

export default function Button({
  children,
  variant,
  loading,
  ...rest
}: ButtonProps) {
  return (
    <Text size="paragraphSmall" asChild>
      <button
        className={buttonVariants({ loading, variant })}
        disabled={loading}
        {...rest}
      >
        {loading && <Loader2 className="animate-spin" />}
        {children}
      </button>
    </Text>
  );
}
