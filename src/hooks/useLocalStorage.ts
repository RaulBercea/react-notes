import { useState } from "react";
import { valueContainerCSS } from "react-select/dist/declarations/src/components/containers";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue;
  });
}
