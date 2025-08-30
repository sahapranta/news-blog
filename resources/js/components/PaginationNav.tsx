import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  prevPageUrl: string | null;
  nextPageUrl: string | null;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}

const getVisibleLinks = (
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[],
  currentPage: number,
  lastPage: number
) => {
  const pagesToShow = 2; // show 2 before and after current
  const result: {
    url: string | null;
    label: string;
    active: boolean;
    ellipsis?: boolean;
  }[] = [];

  for (let i = 1; i <= lastPage; i++) {
    if (
      i === 1 ||
      i === lastPage ||
      (i >= currentPage - pagesToShow && i <= currentPage + pagesToShow)
    ) {
      const link = links.find((l) => l.label == i.toString());
      if (link) result.push(link);
    } else if (
      result[result.length - 1]?.ellipsis !== true // prevent multiple ellipsis
    ) {
      result.push({ url: null, label: "...", active: false, ellipsis: true });
    }
  }

  return result;
}

const PaginationNav: React.FC<PaginationProps> = ({
  currentPage,
  lastPage,
  prevPageUrl,
  nextPageUrl,
  links,
}) => {
  const visibleLinks = getVisibleLinks(links, currentPage, lastPage);

  if (lastPage <= 1) return null; // No pagination needed

  return (
    <Pagination>
      <PaginationContent>
        {prevPageUrl && (
          <PaginationItem>
            <PaginationPrevious href={prevPageUrl} />
          </PaginationItem>
        )}

        {visibleLinks.map((link, index) => (
          <PaginationItem key={index}>
            {link.ellipsis ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={link.url ?? "#"}
                isActive={link.active}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            )}
          </PaginationItem>
        ))}

        {nextPageUrl && (
          <PaginationItem>
            <PaginationNext href={nextPageUrl} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export { PaginationNav, getVisibleLinks };