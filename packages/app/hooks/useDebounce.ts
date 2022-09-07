import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, ms: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>();
  useEffect(() => {
    const debounce = setTimeout(() => setDebouncedValue(value), ms);
    return () => {
      clearTimeout(debounce);
    };
  }, [value, setDebouncedValue, ms]);

  return debouncedValue;
}
