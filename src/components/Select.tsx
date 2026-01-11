import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSharedProps
} from "@/components/ui/select";
import { Text } from "./Text";

interface SelectProps extends SelectSharedProps {
  dataSelect: {
    id: number;
    name: string;
  }[];
  placeholder: string;
  setSelectedItem: (value: string) => void;
  value?: string;
  error?: boolean;
}

export default function Select({
  dataSelect,
  placeholder,
  setSelectedItem,
  value,
  error,
  ...rest
}: SelectProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <Text as="label" size="paragraphSmall">
        {placeholder}
      </Text>

      <SelectComponent onValueChange={setSelectedItem} value={value} {...rest}>
        <SelectTrigger
          className={`w-full bg-background cursor-pointer h-11 ${error ? "border-red-500" : ""}`}
        >
          <SelectValue placeholder={placeholder} className="h-10" />
        </SelectTrigger>
        <SelectContent position="popper">
          <Text size="paragraphSmall" asChild className="h-11">
            <SelectItem value="all">{placeholder}</SelectItem>
          </Text>

          {dataSelect.map(item => (
            <SelectItem
              key={item.id}
              value={String(item.id)}
              className="cursor-pointer opacity-60 h-11"
            >
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectComponent>
    </div>
  );
}
