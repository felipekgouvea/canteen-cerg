"use client";

import { Plus } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import UpsertProductForm from "./upsert-product-form";

const AddProductProduct = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-muted-foreground">
          <Plus />
          Novo Produto
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Produto</DialogTitle>
        </DialogHeader>
        <UpsertProductForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddProductProduct;
