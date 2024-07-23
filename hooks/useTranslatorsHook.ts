import { useCallback, useEffect, useState } from "react";

import { useTranslator } from "@/contexts/translatorContext";
import { getPageableAlltranslators } from "@/service/translatorService";

export const useTranslatorsHook = (initialSearchTerm = "") => {
  const { setTranslators } = useTranslator();
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const fetchTranslators = useCallback(
    async (reset = false) => {
      try {
        const pageableTranslators = await getPageableAlltranslators({
          searchTerm,
          page,
        });

        if (pageableTranslators) {
          setPages(pageableTranslators.totalPages);
          setTranslators((prev) =>
            reset
              ? pageableTranslators.content
              : [...prev, ...pageableTranslators.content],
          );
        }
      } catch (error) {
        console.error("Erro ao obter tradutores:", error);
      }
    },
    [searchTerm, page],
  );

  useEffect(() => {
    fetchTranslators(page === 1);
  }, [fetchTranslators]);

  const loadMore = () => setPage((prev) => prev + 1);

  const resetTranslators = useCallback(() => {
    setPage(1);
    setTranslators([]);
  }, []);

  return {
    setTranslators,
    pages,
    page,
    loadMore,
    searchTerm,
    setSearchTerm,
    resetTranslators,
  };
};
