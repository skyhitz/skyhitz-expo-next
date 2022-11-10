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
      console.log(window.innerHeight);
      setWindowHeight(window.innerHeight);
      setMobileView(window.innerWidth < WIDTH_BREAKPOINT);
    });

    return () => {
      window.removeEventListener("resize", () => {
        console.log(window.innerHeight);
        setWindowHeight(window.innerHeight);
      });
    };
  }, [setWindowHeight]);

  return {
    windowHeight,
    mobileView,
  };
}
