"use client";

import { Button } from "@/app/_components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
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
} from "@/app/_components/ui/select";

import { CartContext } from "@/app/contexts/cart";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
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
import { createStripeCheckout } from "../products/actions/create-stripe-checkout";
import { createOrder } from "@/app/_actions/create-order";

const formSchema = z.object({
  studentId: z.string({ message: "O(a) aluno(a) é obrigatório(a)" }),
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
  const { products } = useContext(CartContext);
  const [students, setStudents] = useState<{ id: string; student: string }[]>(
    [],
  );

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: "",
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
    if (!data?.user.id) return;
    try {
      setIsSubmitLoading(true);
      const order = await createOrder({
        products,
        restaurantId: "cc66275d-0dc1-44f8-833e-b5711edb6bf4",
        studentId: parseInt(formData.studentId),
        userId: data.user.id,
      });

      const { sessionId } = await createStripeCheckout({
        products,
        orderId: order.id,
      });
      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) return;
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
      );
      stripe?.redirectToCheckout({
        sessionId: sessionId,
      });
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
                  name="studentId"
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
                              value={option.id}
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
