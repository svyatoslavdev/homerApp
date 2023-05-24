import { RefObject, useEffect, useRef, useState } from "react";

export const useHover = <T>(): [RefObject<T>, boolean] => {
  const [value, setValue] = useState(false);
  const ref: any = useRef<T | null>(null);
  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(() => {
    const node: any = ref.current;

    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);
      return () => {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, [ref.current]);

  return [ref, value];
};
