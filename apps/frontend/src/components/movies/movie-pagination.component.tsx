import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface MoviesPaginationProps {
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
  totalPages?: number;
}

export const MoviesPagination: React.FC<MoviesPaginationProps> = ({
  setPageNumber,
  pageNumber,
  totalPages,
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => setPageNumber((prev) => (prev !== 1 ? prev - 1 : 1))}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">{pageNumber}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() =>
              setPageNumber((prev) =>
                totalPages && prev < totalPages ? prev + 1 : prev
              )
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
