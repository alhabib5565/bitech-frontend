"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchField from "./Searchfield";

interface Props {
  categories: { id: string; name: string }[];
}

const SearchFilter: React.FC<Props> = ({ categories }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("categoryId") || ""
  );

  // Handle category change directly
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);

    const params = new URLSearchParams();

    if (value) params.set("categoryId", value);

    const newUrl = params.toString()
      ? `/products?${params.toString()}`
      : "/products";
    router.push(newUrl);
  };

  return (
    <div className="flex justify-start max-w-xl w-full gap-6">
      <SearchField />
      <Select value={selectedCategory} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchFilter;
