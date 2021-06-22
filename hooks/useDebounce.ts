import { useEffect } from "react";

export default function useDebounce(
  effect: Function,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const debounceTimeout = setTimeout(effect, 1000);

    return () => clearTimeout(debounceTimeout);
  }, deps);
}
