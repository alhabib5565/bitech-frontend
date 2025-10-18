"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProductForm from "./ProductForm";
import React, { useState } from "react";
import { Button } from "../ui/button";

const CreateProductModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>+ Add Product</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Product</DialogTitle>
          </DialogHeader>
          <ProductForm onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateProductModal;
