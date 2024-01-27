import { useEffect, useRef, useState } from 'react';

type FetchFunction<T> = () => Promise<T>;

interface UseFetchProps<T> {
  fetcher: FetchFunction<T>;
  shouldFetch?: boolean;
}

interface FetchHookState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const UseFetch = <T,>({ fetcher, shouldFetch = false }: UseFetchProps<T>) => {
  const [state, setState] = useState<FetchHookState<T>>({
    data: null,
    loading: true,
    error: null,
  });
  const hasFetched = useRef(false);
  const prevFetcher = useRef<FetchFunction<T> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (
        !shouldFetch ||
        (hasFetched.current && fetcher === prevFetcher.current)
      ) {
        return;
      }

      setState({ data: null, loading: true, error: null });

      try {
        const data = await fetcher();
        setState({ data, loading: false, error: null });
        hasFetched.current = true;
      } catch (error) {
        setState({ data: null, loading: false, error: error as Error });
      }
    };

    fetchData();
    prevFetcher.current = fetcher;
  }, [fetcher, shouldFetch]);

  useEffect(() => {
    if (!shouldFetch) {
      hasFetched.current = false;
    }
  }, [shouldFetch]);

  return state;
};

export default UseFetch;
