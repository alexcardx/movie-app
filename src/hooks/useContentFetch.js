import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

export const useContentFetch = (initialFilters, fetchContent) => {
  const [content, setContent] = useState([]);
  const [loadingContent, setLoadingContent] = useState(true);
  const [fetchContentError, setFetchContentError] = useState(false);
  const [totalPages, setTotalPages] = useState(null);

  const [searchParams] = useSearchParams();

  const paramsObject = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  const fetchContentData = useCallback(async () => {
    setLoadingContent(true);
    setFetchContentError(false);
    try {
      const data = await fetchContent({
        ...initialFilters,
        ...paramsObject,
      });
      setContent(data.results);
      setTotalPages(data.total_pages);
    } catch (err) {
      setFetchContentError(err);
    } finally {
      setLoadingContent(false);
    }
  }, [paramsObject, fetchContent, initialFilters]);

  useEffect(() => {
    fetchContentData();
  }, [fetchContentData]);

  return {
    content,
    loadingContent,
    fetchContentError,
    totalPages,
    refetchContent: fetchContentData,
  };
};
