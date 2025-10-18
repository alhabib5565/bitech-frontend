"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus } from "lucide-react";

import type { TProduct } from "@/types/product.type";
import { useGetAllCategoryQuery } from "@/redux/api/categoryApi";
import { TCategory } from "@/types/category.type";
import { createProduct, editProduct } from "@/action/product-action";

// ✅ Schema
const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  categoryId: z.string().uuid("Please select a valid category"),
  images: z
    .array(z.string().url("Invalid image URL"))
    .min(1, "At least one image is required"),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  onClose: () => void;
  product?: TProduct;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
  const { data: categoryData, isLoading: categoryLoading } =
    useGetAllCategoryQuery(undefined);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    control,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      images: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    name: "images",
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.category.id,
        images:
          product.images && product.images.length > 0 ? product.images : [""],
      });
    }
  }, [product, reset]);

  const onSubmit: SubmitHandler<ProductFormData> = async (values) => {
    const toastId = toast.loading(
      product ? "Updating product..." : "Creating product..."
    );
    setLoading(true);

    try {
      if (product) {
        await editProduct(product.id, values);
        toast.success("Product updated successfully!", { id: toastId });
      } else {
        await createProduct(values);
        toast.success("Product created successfully!", { id: toastId });
      }
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  console.log(errors?.images);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <Input {...register("name")} placeholder="Product name" />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Textarea
          {...register("description")}
          placeholder="Product description"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium mb-1">Price</label>
        <Input
          type="number"
          {...register("price", { valueAsNumber: true })}
          placeholder="Enter price"
        />
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        {categoryLoading ? (
          <p>Loading categories...</p>
        ) : (
          <Select
            onValueChange={(val) => {
              setValue("categoryId", val);
              trigger("categoryId");
            }}
            defaultValue={product?.category?.id || ""}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categoryData?.map((cat: TCategory) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {errors.categoryId && (
          <p className="text-red-500 text-sm mt-1">
            {errors.categoryId.message}
          </p>
        )}
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium mb-2">Product Images</label>
        <div className="space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <Input
                {...register(`images.${index}`)}
                placeholder="https://example.com/image.jpg"
                type="url"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-2 rounded-full bg-red-100 hover:bg-red-200"
                title="Remove"
              >
                <X className="h-4 w-4 text-red-600" />
              </button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => append("")}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" /> Add Image
          </Button>
        </div>
        {errors.images && (
          <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button type="submit" disabled={loading} className="w-full">
        {loading
          ? "Please wait..."
          : product
          ? "Update Product"
          : "Create Product"}
      </Button>
    </form>
  );
};

export default ProductForm;
