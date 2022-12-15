import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./reducers";
import thunkMiddleware from "redux-thunk";
import { decryptiedData, encryptionData } from "./modules/aseItem";

export const history = createBrowserHistory();

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunkMiddleware
      )
    )
  );

  return store;
}

// 快取目前資料，用來快速顯示畫面並過度獲取資料前的短暫空白狀態
var isOnIOS =
  navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i);
var eventName = isOnIOS ? "pagehide" : "beforeunload";
window.addEventListener(eventName, function (e) {
  window.localStorage.setItem("lastTime", Date.now());
  let storeData = store.getState();
  saveUserDate(storeData);
  saveSystem(storeData);
  saveCatchData(storeData);
  saveContentData(storeData);
});

let toInitData = {};
let nowTime = Date.now();
let lastTime = parseInt(window.localStorage.getItem("lastTime"));

// 相關儲存資料請在 index.js 設定
let userDate = window.localStorage.getItem("userData")
  ? JSON.parse(decryptiedData(window.localStorage.getItem("userData")))
  : {};
let systemData = window.localStorage.getItem("systemData")
  ? JSON.parse(decryptiedData(window.localStorage.getItem("systemData")))
  : {};
let catchData = window.localStorage.getItem("catchData")
  ? JSON.parse(decryptiedData(window.localStorage.getItem("catchData")))
  : {};
let contentData = window.localStorage.getItem("contentData")
  ? JSON.parse(decryptiedData(window.localStorage.getItem("contentData")))
  : {};

toInitData = {
  ...userDate,
};

if (nowTime < lastTime + 1000 * 60 * 60) {
  toInitData = {
    ...toInitData,
    ...systemData,
  };
}

if (nowTime < lastTime + 1000 * 60 * 10) {
  if (process.env.NODE_ENV !== "development") {
    toInitData = {
      ...toInitData,
      ...catchData,
      ...contentData,
    };
  } else {
    toInitData = {
      ...toInitData,
      ...catchData,
    };
  }
}

const store = configureStore(toInitData);

export default store;

function saveUserDate(storeData) {
  window.localStorage.setItem(
    "userData",
    encryptionData(
      JSON.stringify({
        user: storeData.user,
        vipInfoData: storeData.vipInfoData,
      })
    )
  );
}

function saveSystem(storeData) {
  window.localStorage.setItem(
    "systemData",
    encryptionData(
      JSON.stringify({
        config: storeData.config,
        areaCode: storeData.areaCode,
        homeCategory: storeData.homeCategory,
        myWatchHistory: storeData.myWatchHistory,
        homeTagData: storeData.homeTagData,
        noticeListRead: storeData.noticeListRead,
        homeCategoryTabList: storeData.homeCategoryTabList,
        homeStreamList: storeData.homeStreamList,
        vendorCategory: storeData.vendorCategory,
      })
    )
  );
}

function saveCatchData(storeData) {
  window.localStorage.setItem(
    "catchData",
    encryptionData(
      JSON.stringify({
        adsList: storeData.adsList,
        noticeList: storeData.noticeList,
        homeSearchTabList: storeData.homeSearchTabList,
        showCoverCenter: {
          ...storeData.showCoverCenter,
          homeFloatAds: true,
        },
      })
    )
  );
}

function saveContentData(storeData) {
  window.localStorage.setItem(
    "contentData",
    encryptionData(
      JSON.stringify({
        homeData: storeData.homeData,
        homeTagData: storeData.homeTagData,
        homeCategoryData: storeData.homeCategoryData,
        homeComicViewData: storeData.homeComicViewData,
        homeComicContentData: storeData.homeComicContentData,
        homeAnimesViewData: storeData.homeAnimesViewData,
        homeAnimesContentData: storeData.homeAnimesContentData,
        homeSearchResultData: storeData.homeSearchResultData,
        homeVideo: storeData.homeVideo,
        homeLeaderBoard: storeData.homeLeaderBoard,
        homeVideoList: storeData.homeVideoList,
        homeVideoContent: storeData.homeVideoContent,
        homeNovelsList: storeData.homeNovelsList,
        homeNovelsListData: storeData.homeNovelsListData,
        homeNovelsContentData: storeData.homeNovelsContentData,
        homePhotosList: storeData.homePhotosList,
        homePhotosListData: storeData.homePhotosListData, // 待確認
        homePhotosContentData: storeData.homePhotosContentData,
        postData: storeData.postData, // 待確認
        postListData: storeData.postListData,
        postTrackData: storeData.postTrackData,
        socialListData: storeData.socialListData,
        socialProfileData: storeData.socialProfileData,
        vendorData: storeData.vendorData,
        vendorListData: storeData.vendorListData,
        myCollectList: storeData.myCollectList,
        myBuyList: storeData.myBuyList,
        transferMoney: storeData.getTransferMoney,
      })
    )
  );
}
