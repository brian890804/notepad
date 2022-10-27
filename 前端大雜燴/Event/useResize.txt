import { useLayoutEffect, useState } from "react";
import throttle from "lodash.throttle";

const breakPoint = {
  mobile: 599, // 這是 mui 的斷點
};
function checkIsMobile() {
  return document.body.getBoundingClientRect().width <= breakPoint.mobile; // 這個是 mui 的斷點設定
}

function useResize() {
  const [size, setSize] = useState([0, 0]);
  const [isMobile, setIsMobile] = useState(checkIsMobile());

  useLayoutEffect(() => {
    function updateSize() {
      setSize({
        width: document.getElementById("root").offsetWidth,
        height: document.getElementById("root").offsetHeight,
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

export default useResize;
