import {
  QueryFunction,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

export function usePaginatedQuery<TData>(
  queryKey: unknown[],
  queryFn: QueryFunction<TData>,
  page: number,
  options?: Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>,
) {
  return useQuery<TData>({
    queryKey: [...queryKey, page],
    queryFn,
    placeholderData: (prev) => prev,
    staleTime: 0,
    ...options,
  });
}
