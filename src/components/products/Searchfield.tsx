"use client";

import { Input } from "@/components/ui/input";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSearchProductQuery } from "@/redux/api/products.api";
import { TProduct } from "@/types/product.type";

// Type definitions

interface SearchFieldProps {
  className?: string;
  placeholder?: string;
  maxSuggestions?: number;
}

const SearchField: React.FC<SearchFieldProps> = ({
  className = "",
  placeholder = "Search Item...",
  maxSuggestions = 8,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data } = useSearchProductQuery(
    { searchedText: searchTerm },
    { skip: !searchTerm }
  ) as {
    data: TProduct[] | undefined;
  };
  const [suggestions, setSuggestions] = useState<TProduct[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [activeSuggestion, setActiveSuggestion] = useState<number>(-1);

  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm.trim() === "" || !data) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filteredProducts = data.filter((product: TProduct) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSuggestions(filteredProducts.slice(0, maxSuggestions));
    setShowSuggestions(filteredProducts.length > 0);
    setActiveSuggestion(-1);
  }, [searchTerm, data, maxSuggestions]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  // Handle suggestion click
  const handleSuggestionClick = (productId: string): void => {
    router.push(`/${productId}`);
    setSearchTerm("");
    setShowSuggestions(false);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (!showSuggestions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveSuggestion((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (activeSuggestion >= 0) {
          handleSuggestionClick(suggestions[activeSuggestion].id);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setActiveSuggestion(-1);
        break;
      default:
        break;
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as Node;

      if (
        searchRef.current &&
        !searchRef.current.contains(target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(target)
      ) {
        setShowSuggestions(false);
        setActiveSuggestion(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle mouse enter for suggestion items
  const handleSuggestionMouseEnter = (index: number): void => {
    setActiveSuggestion(index);
  };

  // Handle input focus
  const handleInputFocus = (): void => {
    if (searchTerm && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  // Handle image error
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement>
  ): void => {
    const target = e.target as HTMLImageElement;
    target.src = "/placeholder-image.png";
  };

  // Truncate long names
  const truncatename = (name: string, maxLength: number = 50): string => {
    return name.length > maxLength
      ? name.substring(0, maxLength) + "..."
      : name;
  };

  // Format price display
  const formatPrice = (price: string): string => {
    return price === "0.00" ? "Contact for Price" : `$${price}`;
  };

  return (
    <div className={`relative w-full max-w-[480px] ${className}`}>
      <div ref={searchRef}>
        <Input
          className="w-full"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          type="text"
          autoComplete="off"
        />
      </div>

      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto mt-1"
          role="listbox"
          aria-label="Search suggestions"
        >
          {suggestions.map((product: TProduct, index: number) => (
            <div
              key={product.id}
              className={`flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors ${
                index === activeSuggestion ? "bg-gray-50" : ""
              }`}
              onClick={() => handleSuggestionClick(product.id)}
              onMouseEnter={() => handleSuggestionMouseEnter(index)}
              role="option"
              aria-selected={index === activeSuggestion}
              tabIndex={-1}
            >
              <div className="flex-shrink-0 w-12 h-12 mr-3 relative">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover rounded"
                  sizes="48px"
                  onError={handleImageError}
                  priority={index < 3} // Prioritize first 3 images
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {truncatename(product.name)}
                </p>
                <p className="text-sm text-gray-500">
                  {formatPrice(String(product.price))}
                </p>
              </div>
              <div className="flex-shrink-0">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchField;
