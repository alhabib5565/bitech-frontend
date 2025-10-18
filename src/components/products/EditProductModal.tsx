"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProductForm from "./ProductForm";
import React, { useState } from "react";
import type { TProduct } from "@/types/product.type";
import { Pencil } from "lucide-react";

interface EditProductModalProps {
  product: TProduct;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ product }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full bg-white p-2.5 shadow transition-transform duration-300 hover:scale-110 active:scale-95"
        aria-label="Edit product"
      >
        <Pencil className="h-4 w-4" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <ProductForm product={product} onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProductModal;
