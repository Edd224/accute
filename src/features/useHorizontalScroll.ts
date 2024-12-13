import { useEffect, useRef } from "react";

const useHorizontalScroll = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const onWheel = (e: WheelEvent) => {
    if (e.deltaY === 0 || !scrollRef.current) return;
    e.preventDefault();
    scrollRef.current.scrollTo({
      left: scrollRef.current.scrollLeft + e.deltaY,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const refValue = scrollRef.current;
    if (refValue) {
      refValue.addEventListener("wheel", onWheel);
    }
    return () => {
      if (refValue) {
        refValue.removeEventListener("wheel", onWheel);
      }
    };
  }, []);

  return scrollRef;
};

export default useHorizontalScroll;
