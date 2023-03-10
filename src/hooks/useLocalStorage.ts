import { useEffect, useState } from "react";
import { valueContainerCSS } from "react-select/dist/declarations/src/components/containers";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  //   checking if the value exists
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue == null) {
      if (typeof initialValue === "function") {
        return (initialValue as () => T)();
      } else {
        return initialValue;
      }
    } else {
      return JSON.parse(jsonValue);
    }
  });

  //   If the value changes update it
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as [T, typeof setValue];
}
