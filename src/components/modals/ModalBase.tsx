import { Plus, X } from "lucide-react";
import { Text } from "../Text";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";
import Button from "../Button";

interface ModalBaseProps {
  children: React.ReactNode;
  title: string;
  loading?: boolean;
  formID?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ModalBase({
  children,
  title,
  loading,
  formID,
  onOpenChange,
  open
}: ModalBaseProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="Insira as informações do produto ou da categoria conforme abaixo">
        <DialogDescription className="sr-only h-0">
          Insira as informações do produto ou da categoria conforme abaixo
        </DialogDescription>
        <DialogHeader className="flex flex-row items-center justify-between border-b border-border pb-5 p-5">
          <Text size="displaySmall">{title}</Text>

          <DialogTitle className="sr-only">{title}</DialogTitle>

          <DialogClose className="cursor-pointer">
            <X className="size-4" />
          </DialogClose>
        </DialogHeader>

        <>
          {children}

          <DialogFooter className="flex-row justify-end border-t border-border pt-3 p-5">
            <DialogClose asChild>
              <Button variant="secondary">Cancelar</Button>
            </DialogClose>
            <Button type="submit" form={formID} loading={loading}>
              Salvar
            </Button>
          </DialogFooter>
        </>
      </DialogContent>
    </Dialog>
  );
}
