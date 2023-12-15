import { webVersion } from "../constants";
import store from "../store";
import axiosRequest from "./axiosItem";

/**
 * @description when ad has been click return to google
 *
 * @param { object } adData
 */
const handleAdClick = function (adData = null) {
  if (adData) {
    window.dataLayer.push({
      event: "clickAds",
      ads_name: adData.name,
      ads_position: adData.cname,
    });
  }
};

/**
 * @description when download has been click return to google
 *
 * @param { object } adData
 */
const handleApkClick = function () {
  window.dataLayer.push({
    event: "clickDownloadApk",
    utm_source: utm_source
  });
};

/**
 * @description when skip download has been click return to google
 *
 * @param { object } adData
 */
const handleSkipApkClick = function () {
  window.dataLayer.push({
    event: "clickSkipApk",
    utm_source: utm_source
  });
};

/**
 * @description GA4 page view event
 *
 * @param { object } location react location
 * @param { object } user useContext user
 */
const handleChangePage = function (location) {
  window.dataLayer.push({
    event: "pageview",
    page_location: location.path,
    page_title: location.name,
    web_version: webVersion,
    user_id: store.getState().user.id,
    utm_source: utm_source
  });
};

const handleRegisterAccount = function () {
  window.dataLayer.push({
    event: "registerAccount",
    utm_source: utm_source
  });
};


const handleDevToolCheckReport = function () {
  axiosRequest.get("https://api.ipify.org").then(ip=>{
    window.dataLayer.push({
      event: "webDevToolCheckReport",
      user_id: store.getState().user.id,
      web_version: webVersion,
      user_browser: navigator.userAgent,
      user_ip: ip,
      utm_source: utm_source
    });
  })
}

// 先從 utilities.js 複製過來使用避免循環依賴
const checkDataExpired = function(localStorageKey = 'test', time = 1000) {
  const timestamp = localStorage.getItem(localStorageKey) ? JSON.parse(localStorage.getItem(localStorageKey)) : 0;
  const nowTime = Date.now();
  if(nowTime >= timestamp + time) {
    return true;
  }else {
    return false;
  }
};

const getUtmSource = function () {
  let urlParameter = false;
  if(!checkDataExpired("urlParameterTimestamp", 1000 * 60 * 60 * 24)){
    urlParameter = localStorage.getItem("utmMark") ? JSON.parse(localStorage.getItem("utmMark")) : {};
  }
  return urlParameter
}


// 先看分享碼，然後在看utm_source
const utm_source = getUtmSource().shareMa || getUtmSource().utm_source;

export { handleAdClick, handleApkClick, handleSkipApkClick, handleChangePage, handleRegisterAccount, handleDevToolCheckReport };
