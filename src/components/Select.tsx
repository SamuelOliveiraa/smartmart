import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Text } from "./Text";

interface SelectProps {
  dataSelect: {
    id: number;
    name: string;
  }[];
  placeholder: string;
  setSelectedItem: (value: string) => void;
}

export default function Select({
  dataSelect,
  placeholder,
  setSelectedItem
}: SelectProps) {
  return (
    <SelectComponent onValueChange={setSelectedItem}>
      <SelectTrigger className="w-full bg-background cursor-pointer h-11">
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
            <Text size="paragraphSmall"> {item.name}</Text>
          </SelectItem>
        ))}
      </SelectContent>
    </SelectComponent>
  );
}
