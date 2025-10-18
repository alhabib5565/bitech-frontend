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

interface EditProductModalProps {
  product: TProduct;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ product }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-blue-600 hover:underline"
      >
        Edit
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
