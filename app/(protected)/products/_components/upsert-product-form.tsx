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
import { menuCategories } from "../_constants";

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
  menuCategory: z.string().min(1, {
    message: "Categoria do produto deve ter pelo menos 1 caractere",
  }),
});

type ProductFormSchema = z.infer<typeof formSchema>;

const UpsertProductForm = () => {
  const form = useForm<ProductFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      imageUrl: "",
      menuCategory: "",
      id: crypto.randomUUID(),
    },
  });

  const onSubmit = (values: ProductFormSchema) => {
    console.log(values);
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
              name="menuCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-light">
                    Categoria do produto
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria do produto" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="mt-2 w-[450px] bg-white p-2">
                      {menuCategories.map((option) => (
                        <SelectItem
                          className="flex w-full gap-5"
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
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
            <Button
              className="bg-primary text-primary-foreground hover:bg-muted-foreground"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
export default UpsertProductForm;
