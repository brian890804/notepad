import React from "react";
import { useLayoutEffect, useState } from "react";
import throttle from "lodash.throttle";
import { checkIsMobile } from "../constant";
type TSize = {
  width: Number |undefined;
  height: Number;
};
function useMediaSetting() {
  const [size, setSize] = useState<TSize>({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(checkIsMobile());

  useLayoutEffect(() => {
    function updateSize() {
      setSize({
        width: document.getElementById("root")?.offsetWidth,
        height: window.screen.availHeight,
      });
      setIsMobile(checkIsMobile());
    }

    const throttleUpdateSize = throttle(updateSize, 100);

    window.addEventListener("resize", throttleUpdateSize);
    throttleUpdateSize();
    return () => window.removeEventListener("resize", throttleUpdateSize);
  }, []);

  return { size, isMobile };
}

export default useMediaSetting;
