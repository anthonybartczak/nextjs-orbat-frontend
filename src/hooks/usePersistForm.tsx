import { useEffect } from "react";

export const usePersistForm = ({
    value,
    localStorageKey,
  }: any) => {
    useEffect(() => {
      window.localStorage.setItem(localStorageKey, JSON.stringify(value));
    }, [value, localStorageKey]);

    return;
};