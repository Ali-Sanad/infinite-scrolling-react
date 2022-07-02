import {useEffect, useState, useRef, useCallback} from 'react';
import {API_URL} from './constants';
import {ImageDataType} from './types';

export default function useImages() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [images, setImages] = useState<ImageDataType[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const observer = useRef<IntersectionObserver>();
  const lastImageElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchImages = async (
    url: string,
    signal: AbortSignal,
    pageNumber: number
  ) => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`${url}?_page=${pageNumber}&_limit=5`, {
        signal,
      });

      const data = await res.json();

      setImages((previmages) => [...previmages, ...data]);
      setHasMore(data.length > 0);
      setLoading(false);
    } catch (err: any) {
      console.log({err});
      if (err.name == 'AbortError') return;
      setError(true);
    }
  };

  useEffect(() => {
    const controller: AbortController = new AbortController();
    const signal = controller.signal;
    fetchImages(API_URL, signal, pageNumber);

    return () => controller.abort();
  }, [pageNumber]);

  return {loading, error, images, hasMore, lastImageElementRef};
}
