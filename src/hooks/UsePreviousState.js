import { useEffect, useRef } from "react";

export function usePreviousState(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
