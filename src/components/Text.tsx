import { Slot } from "@radix-ui/react-slot";
import { tv } from "tailwind-variants";

type TextProps = {
  as?: React.HTMLElementType;
  children: React.ReactNode;
  size?:
    | "displayLarge"
    | "displayMedium"
    | "displaySmall"
    | "paragraphBase"
    | "paragraphSmall"
    | "paragraphTiny";
  className?: string;
  asChild?: boolean;
};

const textVariants = tv({
  base: "font-inter leading-6 font-semibold text-primary",
  variants: {
    size: {
      displayLarge: "text-2xl",
      displayMedium: "text-xl",
      displaySmall: "text-lg",
      paragraphBase: "text-base font-normal",
      paragraphSmall: "text-sm font-medium",
      paragraphTiny: "text-xs uppercase font-medium"
    }
  },
  defaultVariants: {
    size: "paragraphBase"
  }
});

export const Text = ({ asChild, size, className, ...props }: TextProps) => {
  const Component = asChild ? Slot : "span";

  return <Component className={textVariants({ size, className })} {...props} />;
};
