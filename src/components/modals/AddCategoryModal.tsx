import { useForm } from "react-hook-form";
import InputComponent from "../InputComponent";
import ModalBase from "./ModalBase";
import { useEffect, useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { delay } from "@/lib/delay";
import toast from "react-hot-toast";

type FormValues = {
  name: string;
};

export default function AddCategoryModal() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { createCategory } = useCategories();

  async function handleSubmitForm(data: FormValues) {
    setLoading(true);
    try {
      createCategory(data);
      await delay(1000);
      toast.success("Categoria criada com sucesso!");
      setOpen(false);
      reset();
    } catch (error) {
      toast.error("Erro ao criar categoria! Por favor, tente novamente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // Quando o componente for desmontado, reseta o form
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <ModalBase
      loading={loading}
      formID="form-add-category"
      title="Cadastrar Categoria"
      open={open}
      onOpenChange={setOpen}
    >
      <div className="p-5">
        <form id="form-add-category" onSubmit={handleSubmit(handleSubmitForm)}>
          <InputComponent
            type="text"
            inputID="name"
            label="Nome da categoria"
            placeholder="Digite o nome da categoria"
            register={register("name", {
              required: "O nome da categoria é obrigatorio"
            })}
            error={errors.name}
          />
        </form>
      </div>
    </ModalBase>
  );
}
