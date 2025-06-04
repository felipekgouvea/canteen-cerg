"use client";

import { NumericFormat } from "react-number-format";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/_components/ui/form";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useEffect, useState, useTransition } from "react";
import { upsertProduct } from "@/app/_actions/upsert-product";
import { toast } from "sonner";
import { getMenuCategories } from "@/app/_actions/get-menu-categories";

const formSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, { message: "Nome do produto deve ter pelo menos 1 caractere" }),
  price: z
    .number()
    .min(0, { message: "Preço do produto deve ser maior que 0" }),
  description: z.string().min(1, {
    message: "Descrição do produto deve ter pelo menos 1 caractere",
  }),
  imageUrl: z.string().min(1, { message: "URL da imagem é obrigatória" }),
  menuCategoryId: z.string().min(1, {
    message: "Categoria do produto deve ter pelo menos 1 caractere",
  }),
  restaurantId: z.string().min(1, {
    message: "Restaurante do produto deve ter pelo menos 1 caractere",
  }),
});

interface UpsertProductFormProps {
  onSuccess?: () => void;
}

type ProductFormSchema = z.infer<typeof formSchema>;

const UpsertProductForm = ({ onSuccess }: UpsertProductFormProps) => {
  const form = useForm<ProductFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      imageUrl: "",
      menuCategoryId: "", // inicial vazio para forçar seleção
      id: crypto.randomUUID(),
      restaurantId: "cc66275d-0dc1-44f8-833e-b5711edb6bf4",
    },
  });
  const [menuCategories, setMenuCategories] = useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getMenuCategories();

      setMenuCategories(res);
    };

    fetchCategories();
  }, []);

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: ProductFormSchema) => {
    startTransition(async () => {
      try {
        await upsertProduct({
          id: values.id,
          name: values.name,
          priceInCents: Math.round(values.price * 100), // transforma em centavos
          description: values.description,
          imageUrl: values.imageUrl,
          menuCategoryId: values.menuCategoryId,
          restaurantId: values.restaurantId,
        });

        onSuccess?.();
        toast.success("Produto salvo com sucesso");
      } catch (error) {
        console.error("Erro ao salvar produto", error);
        toast.error("Erro ao salvar produto");
      }
    });
  };

  return (
    <DialogContent className="h-[600px] max-w-4xl">
      <DialogHeader>
        <DialogTitle>Adicionar produto</DialogTitle>
        <DialogDescription>Adicione um novo produto</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID do produto</FormLabel>
                  <FormControl>
                    <Input {...field} disabled value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do produto</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="menuCategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-light">
                    Categoria do produto
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria do produto" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="mt-2 w-[450px] bg-white p-2">
                      {menuCategories.map((option) => (
                        <SelectItem
                          className="flex w-full gap-5"
                          key={option.id}
                          value={option.id}
                        >
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-sm font-semibold" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço do produto</FormLabel>
                  <NumericFormat
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value.floatValue);
                    }}
                    decimalScale={2}
                    fixedDecimalScale
                    decimalSeparator=","
                    allowNegative={false}
                    allowLeadingZeros={false}
                    thousandSeparator="."
                    customInput={Input}
                    prefix="R$"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição do produto</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="h-[200px]"
                      style={{ resize: "none" }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da imagem</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Salvando..." : "Salvar"}
            </Button>
            <Button
              onClick={() => {
                form.reset();
                onSuccess?.();
              }}
              type="button"
              variant="outline"
            >
              Cancelar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
export default UpsertProductForm;
