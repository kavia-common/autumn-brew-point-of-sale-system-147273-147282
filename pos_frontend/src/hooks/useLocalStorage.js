import { useCallback, useEffect, useState } from 'react';

// PUBLIC_INTERFACE
export default function useLocalStorage(key, initialValue) {
  /** Persist a value in localStorage with SSR safety */
  const readValue = useCallback(() => {
    try {
      if (typeof window === 'undefined') return initialValue;
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState(readValue);

  useEffect(() => {
    setStoredValue(readValue());
  }, [readValue]);

  const setValue = useCallback((value) => {
    try {
      const v = value instanceof Function ? value(storedValue) : value;
      setStoredValue(v);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(v));
      }
    } catch {
      // ignore
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}
