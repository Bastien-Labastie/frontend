import { useState, useEffect } from "react";

function useLocalStorage(key, firstValue = null) {
  const isClient = typeof window !== "undefined" && typeof localStorage !== "undefined";
  const initialValue = isClient ? localStorage.getItem(key) || firstValue : firstValue;

  const [item, setItem] = useState(initialValue);

  useEffect(function setKeyInLocalStorage() {
    if (!isClient) return; // Prevents errors in non-browser environments

    console.debug("hooks useLocalStorage useEffect", "item=", item);

    if (item === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, item);
    }
  }, [key, item, isClient]);

  return [item, setItem];
}

export default useLocalStorage;