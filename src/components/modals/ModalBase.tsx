import { Plus, X } from "lucide-react";
import { Text } from "../Text";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from "../ui/dialog";
import Button from "../Button";

export default function ModalBase({
  children,
  title,
  loading,
  formID
}: {
  children: React.ReactNode;
  title: string;
  loading?: boolean;
  formID?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-row items-center justify-between border-b border-border pb-5 p-5">
          <Text size="displaySmall">{title}</Text>

          <DialogClose className="cursor-pointer">
            <X className="size-4" />
          </DialogClose>
        </DialogHeader>

        <>
          {children}

          <DialogFooter className="border-t border-border pt-3 p-5">
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
