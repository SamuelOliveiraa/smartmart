import { useForm } from "react-hook-form";
import InputComponent from "../InputComponent";
import ModalBase from "./ModalBase";
import { useEffect, useState } from "react";
import { categoriesAPI } from "@/api/categoriesAPI";

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

  async function handleSubmitForm(data: FormValues) {
    setLoading(true);
    try {
      await categoriesAPI.post(data);
      reset();
    } catch (error) {
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
