import { cn } from "@/lib/utils";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { tv } from "tailwind-variants";

type InputFormProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  inputID: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  helperText?: string;
  children?: React.ReactNode;
  className?: string;
};

const InputVariants = tv({
  base: "transition-colors duration-200 py-3 px-2 border border-border focus:outline-none focus:border-blue-600 disabled:bg-transparent rounded-md",
  variants: {
    hasError: {
      true: "border-red-500"
    },
    hasPrefixValue: {
      true: "pl-6"
    }
  },
  defaultVariants: {
    hasError: false,
    hasPrefixValue: false
  }
});

const labelVariants = tv({
  base: "font-inter leading-6 text-primary text-sm",
  variants: {
    error: {
      true: "text-red-500"
    }
  },
  defaultVariants: {
    error: false
  }
});

export default function InputComponent({
  inputID,
  label,
  helperText,
  error,
  placeholder,
  register,
  children,
  className,
  ...rest
}: InputFormProps) {
  return (
    <div className="flex flex-col gap-2 relative">
      <div className="flex flex-col-reverse relative gap-2">
        {inputID === "value" && (
          <span className="text-base absolute top-7">R$</span>
        )}

        <input
          id={inputID}
          {...register}
          className={cn(
            InputVariants({
              hasError: !!error,
              hasPrefixValue: inputID === "value"
            }),
            className
          )}
          placeholder={placeholder}
          {...rest}
        />

        <label htmlFor={inputID} className={labelVariants({ error: !!error })}>
          {label}
        </label>
      </div>

      {children}

      {error && <span className="text-sm text-red-500">{error.message}</span>}

      {!error && helperText && (
        <span className="text-sm text-gray-400 italic">{helperText}</span>
      )}
    </div>
  );
}
