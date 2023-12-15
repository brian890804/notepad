import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import adsList from "./adsList";
import noticeList from "./noticeList";
import noticeListRead from "./noticeListRead";
import user from "./user";
import config from "./config";
import breadcrumbs from "./breadcrumbs";
import areaCode from "./areaCode";

import routesGuard from "./routesGuard";

import outOfQuotaData from "./outOfQuotaData";

// home
import homeData from "./homeMain/homeData";
import homeAnimeData from "./homeAnimes/homeAnimeData";
import homeCategory from "./homeAnimes/homeCategory";

// homeAnimes

import homeAnimesViewData from "./homeAnimes/homeAnimesViewData";
import homeAnimesContentData from "./homeAnimes/homeAnimesContentData";

// homeComic

import homeComicViewData from "./homeComic/homeComicViewData";
import homeComicContentData from "./homeComic/homeComicContentData";

// homeLeaderBoard

import homeLeaderBoard from "./homeLeaderBoard/homeLeaderBoard";

// homeCategoryData

import homeTagData from "./homeCategory/homeTagData";
import homeCategoryData from "./homeCategory/homeCategoryData";
import homeCategoryTabList from "./homeCategory/homeCategoryTabList";

// homeSearch

import homeSearchTabList from "./homeSearch/homeSearchTabList";
import homeSearchResultData from "./homeSearch/homeSearchResultData";

//homevideo

import homeVideo from "./homeVideo/homeVideo";
import homeVideoList from "./homeVideo/homeVideoList";
import homeVideoContent from "./homeVideo/homeVideoContent";

// homeNovels

import homeNovel from "./homeNovels/homeNovels";
import homeNovelsList from "./homeNovelsList";
import homeNovelsListData from "./homeNovels/homeNovelsListData";
import homeNovelsContentData from "./homeNovels/homeNovelsContentData";

// homePhotos
import homePhoto from "./homePhotos/homePhoto";
import homePhotosList from "./homePhotosList";
import homePhotosListData from "./homePhotos/homePhotosListData";
import homePhotosContentData from "./homePhotos/homePhotosContentData";

// hoemStream

import homeStreamList from "./homeStreamList";

// post

import postData from "./post/postData";
import postSameTagList from "./post/postSameTagList";
import postProfile from "./post/postProfile";
import postTags from "./post/postTags";
import postListData from "./post/postListData";
import postTrackData from "./post/postTrackData";
import postRecommend from "./post/postRecommend";
import postRecommendFriendList from "./post/postRecommendFriendList";
import postNotice from "./post/postNotice";

import postRecommendList from "./post/postRecommendList";

// social

import socialListData from "./social/socialListData";
import socialProfileData from "./social/socialProfileData";

// vender

import vendorCategory from "./vender/vendorCategory";
import vendorListData from "./vender/vendorListData";
import vendorGameListData from "./vender/vendorGameListData";
import vendorData from "./vender/vendorData";

// profile

import vipInfoData from "./profile/vipInfoData";
import myorderData from "./profile/myorderData";
import myorderDataDetail from "./profile/myorderDataDetail";
import profileDirectBuy from "./profile/profileDirectBuy";
import myWatchHistory from "./profile/myWatchHistory";
import getTransferMoney from "./profile/getTransferMoney";

import myCollectList from "./myCollectList";
import myBuyList from "./myBuyList";

import showCoverCenter from "./showCoverCenter";

// game

import gameListData from "./games/gameListData";

//pc footer
import pcFooter from "./pcFooter";

//scroll to top
import scrollToTopStatus from "./scrollToTopStatus";

const createRootReducer = (history) =>
  combineReducers({
    adsList,
    noticeList,
    noticeListRead,
    user,
    config,
    areaCode,
    breadcrumbs,
    outOfQuotaData,
    homeAnimeData,
    homeData,
    homeCategory,
    homeTagData,
    homeCategoryData,
    homeCategoryTabList,
    homeComicViewData,
    homeComicContentData,
    homeAnimesViewData,
    homeAnimesContentData,
    homeSearchTabList,
    homeSearchResultData,
    homeVideo,
    homeLeaderBoard,
    homeVideoList,
    homeVideoContent,
    homeNovel,
    homeNovelsList,
    homeNovelsListData,
    homeNovelsContentData,
    homePhoto,
    homePhotosList,
    homePhotosListData,
    homePhotosContentData,
    homeStreamList,
    gameListData,
    postData,
    postSameTagList,
    postProfile,
    postTags,
    postListData,
    postTrackData,
    postRecommend,
    postRecommendList,
    postRecommendFriendList,
    postNotice,
    socialListData,
    socialProfileData,
    vendorCategory,
    vendorData,
    vendorListData,
    vendorGameListData,
    routesGuard,
    vipInfoData,
    myorderData,
    profileDirectBuy,
    myorderDataDetail,
    myWatchHistory,
    getTransferMoney,
    myCollectList,
    myBuyList,
    showCoverCenter,
    pcFooter,
    scrollToTopStatus,
    router: connectRouter(history),
  });

export default createRootReducer;
