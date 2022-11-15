import { useEffect, useState } from "react";

type Result = {
  windowHeight: number;
  mobileView: boolean;
};

const WIDTH_BREAKPOINT = 640;
export function useWindowSize(): Result {
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const [mobileView, setMobileView] = useState<boolean>(
    window.innerWidth < WIDTH_BREAKPOINT
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowHeight(window.innerHeight);
      setMobileView(window.innerWidth < WIDTH_BREAKPOINT);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setWindowHeight(window.innerHeight);
        setMobileView(window.innerWidth < WIDTH_BREAKPOINT);
      });
    };
  }, [setWindowHeight]);

  return {
    windowHeight,
    mobileView,
  };
}
