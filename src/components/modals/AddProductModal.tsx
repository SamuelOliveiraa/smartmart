import { Controller, useForm } from "react-hook-form";
import InputComponent from "../InputComponent";
import ModalBase from "./ModalBase";
import { useEffect, useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { formatCurrencyBRL } from "@/lib/formatCurrencyBRL";
import Select from "../Select";

type FormValues = {
  name: string;
  category: string;
  price: number;
  description: string;
  brand: string;
};

export default function AddProductModal() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { categories } = useCategories();

  async function handleSubmitForm(data: FormValues) {
    setLoading(true);
    try {
      console.log(data);

      /*
      if (!categorySelected) return;
      // createCategory(data);
      await delay(1000);
      setOpen(false);
      reset();

      */
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
      formID="form-add-products"
      title="Cadastrar Products"
      open={open}
      onOpenChange={setOpen}
    >
      <div className="p-5">
        <form
          id="form-add-products"
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <InputComponent
            type="text"
            inputID="name"
            label="Nome do produto"
            placeholder="Digite o nome do produto"
            register={register("name", {
              required: "O nome do produto é obrigatorio"
            })}
            error={errors.name}
          />

          <InputComponent
            type="text"
            inputID="description"
            label="Descrição do produto"
            placeholder="Digite a descrição do produto"
            register={register("description")}
            error={errors.description}
            className="pb-16 pt-2 placeholder:text-start text-wrap"
          />

          <InputComponent
            type="text"
            inputID="brand"
            label="Marca do produto"
            placeholder="Digite a marca do produto"
            register={register("brand", {
              required: "A marca do produto é obrigatorio"
            })}
            error={errors.brand}
          />

          <Controller
            name="category"
            control={control}
            rules={{ required: "Selecione uma categoria" }}
            render={({ field }) => (
              <>
                <Select
                  dataSelect={categories}
                  placeholder="Todas as categorias"
                  value={field.value}
                  setSelectedItem={field.onChange}
                  error={errors.category?.message ? true : false}
                />
              </>
            )}
          />

          <InputComponent
            type="text"
            inputID="price"
            label="Preço do produto"
            placeholder="Digite o preço do produto"
            register={register("price", {
              required: "O preço do produto é obrigatório",
              onChange: e => {
                const { value } = e.target;
                // Aplica a máscara e atualiza o valor do input
                e.target.value = formatCurrencyBRL(value);
              }
            })}
            error={errors.price}
          />
        </form>
      </div>
    </ModalBase>
  );
}
