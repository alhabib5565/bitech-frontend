"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

const MyPagination = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get values from query (if any)
  const limitFromUrl = Number(searchParams.get("limit")) || 10;
  const offsetFromUrl = Number(searchParams.get("offset")) || 0;

  // Local states
  const [itemsPerPage, setItemsPerPage] = useState(limitFromUrl);
  const [activePage, setActivePage] = useState(
    Math.floor(offsetFromUrl / itemsPerPage)
  );

  // Total items & pages
  const totalCount = 50;
  const totalPage = Math.ceil(totalCount / itemsPerPage);
  const pageNumbers = [...Array(totalPage).keys()];
  const options = [5, 10, 20];

  // Helper: update query params in URL
  const updateUrl = (page: number, limit: number) => {
    const offset = page * limit;
    const params = new URLSearchParams(searchParams.toString());

    params.set("offset", offset.toString());
    params.set("limit", limit.toString());

    const newUrl = `/products?${params.toString()}`;
    router.push(newUrl);
  };

  // Handle limit change
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(event.target.value);
    setItemsPerPage(newLimit);
    setActivePage(0);
    updateUrl(0, newLimit);
  };

  // Next / Prev page
  const nextPage = () => {
    const newPage = activePage + 1 >= totalPage ? 0 : activePage + 1;
    setActivePage(newPage);
    updateUrl(newPage, itemsPerPage);
  };

  const previousPage = () => {
    const newPage = activePage === 0 ? totalPage - 1 : activePage - 1;
    setActivePage(newPage);
    updateUrl(newPage, itemsPerPage);
  };

  // Go to selected page
  const goToPage = (page: number) => {
    setActivePage(page);
    updateUrl(page, itemsPerPage);
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      {/* Previous */}
      <Button onClick={previousPage} variant="outline" className="size-8 p-2">
        <ChevronLeft size={20} />
      </Button>

      {/* Page Numbers */}
      {pageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          onClick={() => goToPage(pageNumber)}
          variant={activePage === pageNumber ? "default" : "outline"}
          className="size-8 p-2"
        >
          {pageNumber + 1}
        </Button>
      ))}

      {/* Next */}
      <Button onClick={nextPage} variant="outline" className="size-8 p-2">
        <ChevronRight size={20} />
      </Button>

      {/* Items Per Page */}
      <select
        value={itemsPerPage}
        onChange={handleSelectChange}
        className="px-2 py-1 bg-gray-100 text-gray-700 border rounded-md focus:outline-none"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option} / page
          </option>
        ))}
      </select>
    </div>
  );
};

export default MyPagination;
