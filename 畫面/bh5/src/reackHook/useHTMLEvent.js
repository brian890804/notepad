import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import throttle from "lodash.throttle";
import { updateScrollToTopStateAction } from "../reducers/actions/config";

export default function HTMLEvent() {
  const dispatch = useDispatch();
  const onScrollBottom = useCallback(() => {
    if (window.scrollY > window.innerHeight / 2) {
      dispatch(updateScrollToTopStateAction(true));
    } else {
      dispatch(updateScrollToTopStateAction(false));
    }
  });
  const throttleUpdateScroll = throttle(onScrollBottom,100);
  useEffect(() => {
    window.addEventListener("scroll", throttleUpdateScroll);
    return () => {
      window.removeEventListener("scroll", throttleUpdateScroll);
    };
  }, []);

  return { onScrollBottom };
}
