export const titleFontSize = "1.1rem";
export const breakPoint = {
  mobile: 599, // 這是 mui 的斷點
};
export const apiDomain =
  process.env.NODE_ENV === "development"
    ? "/api"
    // : "https://staging.bili01.com";
    : "https://hub2bcy.com";
export const toastAutoCloseDuring = 1000;
export const colors = {
  dark_pink: "#FA719A",
  light_pink: "#fcdce5",
  back_dark_pink: "#f24c7c",
  text_grey: "#646464",
  text_light_grey: "#a8a8a8",
  back_grey: "#f4f4f4",
  light_star: "#fde17b",
  background_gray: "#f3f4f5",
};

export function checkIsMobile() {
  return (
    document.body.getBoundingClientRect().width <= breakPoint.mobile 
    // ||window.orientation === 90
  ); // 這個是 mui 的斷點設定
}
