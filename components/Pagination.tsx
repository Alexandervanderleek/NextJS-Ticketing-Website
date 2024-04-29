"use client";
import React from "react";
import { Button } from "./ui/button";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Divide,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);

  const router = useRouter();
  const searchParams = useSearchParams();

  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <div className="mt-4">
      <div className="flex justify-start">
        <Button
          variant={"link"}
          disabled={currentPage == 1}
          onClick={() => changePage(1)}
        >
          <ChevronFirst />
        </Button>
        <Button
          variant={"link"}
          disabled={currentPage == 1}
          onClick={() => changePage(currentPage - 1)}
        >
          <ChevronLeft />
        </Button>
        <div className="flex items-center">
          <p>
            {currentPage} of {pageCount}
          </p>
        </div>
        <Button
          variant={"link"}
          disabled={currentPage == pageCount}
          onClick={() => changePage(currentPage + 1)}
        >
          <ChevronRight />
        </Button>
        <Button
          variant={"link"}
          disabled={currentPage == pageCount}
          onClick={() => changePage(pageCount)}
        >
          <ChevronLast />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
