"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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

import type { TProduct } from "@/types/product.type";
import { useGetAllCategoryQuery } from "@/redux/api/categoryApi";
import { TCategory } from "@/types/category.type";
import { createProduct, editProduct } from "@/action/product-action";

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
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      images: [],
    },
  });

  // 🧠 Reset form if in edit mode
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.category.id,
        images: product.images || [],
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
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categoryData ? (
                categoryData?.map((cat: TCategory) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value={"9b4e3307-1343-4fcf-ad49-b8378accfe66"}>
                  Demo category
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        )}
        {errors.categoryId && (
          <p className="text-red-500 text-sm mt-1">
            {errors.categoryId.message}
          </p>
        )}
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <Input
          placeholder="https://example.com/image.jpg"
          onChange={(e) => {
            setValue("images", [e.target.value]);
            trigger("images");
          }}
          defaultValue={product?.images?.[0] || ""}
        />
        {errors.images && (
          <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>
        )}
      </div>

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
