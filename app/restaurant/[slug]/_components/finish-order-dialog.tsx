"use client";

import { createOrder } from "@/app/_actions/order";
import { Button } from "@/app/_components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/app/_components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CartContext } from "@/app/contexts/cart";
import { OrderStatus } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { CLASS } from "./class-select";
import { getStudentByClass } from "@/app/_actions/get-student-by-class";

const formSchema = z.object({
  studentName: z
    .string({
      message: "O nome do(a) aluno(a) é obrigatório!",
    })
    .trim()
    .min(3, {
      message: "O nome do(a) aluno(a) deve conter no minímo 3 letras!",
    }),
  studentClass: z.enum([
    "Selecione",
    "MATERNAL",
    "PRE_I",
    "PRE_II",
    "PRIMEIRO",
    "SEGUNDO",
    "TERCEIRO",
    "QUARTO",
    "QUINTO",
  ]),
});

type FormSchema = z.infer<typeof formSchema>;

interface FinishOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FinishOrderDialog = ({ onOpenChange, open }: FinishOrderDialogProps) => {
  const { data } = useSession();
  const { total, clearCart, products, toggleCart } = useContext(CartContext);
  const router = useRouter();
  const [students, setStudents] = useState<{ id: string; student: string }[]>(
    [],
  );

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "",
      studentClass: "Selecione",
    },
    shouldUnregister: true,
  });

  const handleChangeSerie = async (serie: string) => {
    form.setValue("studentClass", serie as FormSchema["studentClass"]); // Atualiza no formulário
    const studentSeries = await getStudentByClass(serie);
    setStudents(studentSeries);
  };

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  // const handleUserNotLogin = () => {
  //   try {
  //     setIsSubmitLoading(true);
  //     toast("Usuário não está logado no sistema!", {
  //       description: "Você precisa fazer login para realizar um pedido.",
  //       action: {
  //         label: "Home Page",
  //         onClick: () => router.push("/"),
  //       },
  //     });
  //     toggleCart();
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsSubmitLoading(false);
  //   }
  // };

  const handleFinishOrder = async (formData: FormSchema) => {
    if (!data?.user) return;

    try {
      setIsSubmitLoading(true);
      await createOrder({
        total,
        studentClass: formData.studentClass,
        studentName: formData.studentName,
        status: OrderStatus.PENDING,
        restaurant: {
          connect: { id: "1bf67991-edd3-4624-9fa8-748c94723788" },
        },
        user: {
          connect: { id: data?.user.id },
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
              price: product.price,
            })),
          },
        },
      });
      clearCart();
      toast("Pedido finalizado com sucesso!", {
        description: "Você pode acompanha-lo na tela dos seus pedidos.",
        action: {
          label: "Meus pedidos",
          onClick: () => router.push("/my-orders"),
        },
      });
      toggleCart();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Deseja finalizar o pedido?</DrawerTitle>
          </DrawerHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFinishOrder)}
              className="space-y-8 px-5"
            >
              <FormField
                control={form.control}
                name="studentClass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-light">
                      Série do(a) Aluno(a)
                    </FormLabel>
                    <Select
                      onValueChange={(value) => handleChangeSerie(value)}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a série do(a) aluno(a)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="mt-2 w-[450px] bg-white p-2">
                        {CLASS.map((option) => (
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
              {students.length > 0 && (
                <FormField
                  control={form.control}
                  name="studentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-light">
                        Nome do(a) Aluno(a)
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o nome do(a) aluno(a)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="mt-2 w-[450px] bg-white p-2">
                          {students.map((option) => (
                            <SelectItem
                              className="flex w-full gap-5"
                              key={option.id}
                              value={option.student}
                            >
                              {option.student}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-sm font-semibold" />
                    </FormItem>
                  )}
                />
              )}

              <DrawerFooter>
                <Button
                  variant="outline"
                  disabled={isSubmitLoading}
                  type="submit"
                >
                  {isSubmitLoading && <Loader2 className="animate-spin" />}
                  Sim
                </Button>
                <DrawerClose asChild>
                  <Button className="w-full" variant="destructive">
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FinishOrderDialog;
