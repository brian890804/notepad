import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "@emotion/styled/macro";
import { I18nProvider } from "./i18n/i18nProvider";

import { getAdsData } from "./reducers/actions/adsList";
import { getConfigData } from "./reducers/actions/config";
import { getNoticeData } from "./reducers/actions/noticeList";

import routes from "./routes";

import { AxiosCenter } from "./modules/axiosItem";

import SwitchRoute from "./pages/component/SwitchRoute";
import BottomNavBar from "./pages/component/BottomNavBar";
import OutOfQuotaPortal from "./pages/component/OutOfQuotaPortal";

import {
  showBottomBarWhenPathEquals,
  loginCheckWhenPathEquals,
  toastAutoCloseDuring,
  pageUrlConstants,
} from "./constants";
import { initRoutes, pushRoutes } from "./reducers/actions/historyActions";
import { blockStateAction } from "./reducers/actions/routesGuard";
import { CSSTransition } from "react-transition-group";
import { hideOutOfQuotaPortalAction } from "./reducers/actions/outOfQuotaData";

import MentionAppCover from "./pages/component/MentionAppCover";
import { toggleMentionAppCoverAction } from "./reducers/actions/showCoverCenter";
import AnnouncementCover from "./pages/component/AnnouncementCover";
import { updateUserDataAction } from "./reducers/actions/user";
import useMediaSetting from "./reackHook/useMediaSetting";
import PCFooter from "./pages/component/PCFooter";
import MinorsProhibitedDialog from "./pages/component/MinorsProhibitedDialog";
import store from "./store";
import { setPcFooter } from "./reducers/actions/controlPcFooter";
import useHTMLEvent from "./reackHook/useHTMLEvent";
import { isMobile } from "react-device-detect";
import IdleWindow from "./pages/component/IdleWindow";

const { start, login } = pageUrlConstants;

let confirmDelayClock;

function App({
  user,
  location,
  mentionAppCoverState,
  announcementCoverState,
  dataInit,
  updateUserData,
  toStartPage,
  toLogin,
  setBlockStateAction,
  closeOutOfQuotaPortal,
  showOutOfQuota,
  closeMentionAppCover,
  PCFooterStatus,
  setPcFooter,
}) {
  const { onScrollBottom } = useHTMLEvent();
  const { isMobile } = useMediaSetting();
  const [showBottomNav, setShowBottomNav] = useState(isMobile);
  onScrollBottom();
  useEffect(() => {
    // 開發關閉廣告
    if (process.env.NODE_ENV !== "development") {
      const userAgent = window.navigator.userAgent;
      if (
        location.pathname !== "/" &&
        isMobile &&
        !/iPad|iPhone|iPod/.test(userAgent)
      ) {
        toStartPage();
      }
    }
    // if (user.id !== "guest") {
    //   updateUserData();
    // }
    dataInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let locationPathCheck = location.pathname;
    clearTimeout(confirmDelayClock);
    confirmDelayClock = setTimeout(() => {
      for (let i = 0; i < loginCheckWhenPathEquals.length; i++) {
        let toCheck = loginCheckWhenPathEquals[i];
        // 目前參數型的都沒有要顯示所以先槓掉不用判斷
        if (toCheck.indexOf(":") !== -1) {
          toCheck = toCheck.split("/");
          locationPathCheck = locationPathCheck.split("/");
          for (let j = 0; j < toCheck.length; j++) {
            if (toCheck[j].indexOf(":") !== -1) {
              toCheck[j] = locationPathCheck[j];
            }
          }
          toCheck = toCheck.join("/");
          locationPathCheck = locationPathCheck.join("/");
        }
        if (locationPathCheck === toCheck && user.id === "guest") {
          toLogin();
          setBlockStateAction(true);
          closeOutOfQuotaPortal();
          return;
        }
      }
    }, 100);
    for (let i = 0; i < showBottomBarWhenPathEquals.length; i++) {
      let toCheck = showBottomBarWhenPathEquals[i];
      if (locationPathCheck === toCheck && isMobile) {
        setShowBottomNav(true);
        return;
      }
    }
    setShowBottomNav(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, isMobile]);

  useEffect(() => {
    if (isMobile) {
      setPcFooter(false);
    } else {
      setPcFooter(true);
    }
  }, [isMobile, location.pathname]);

  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);
  return (
    <I18nProvider>
      <RootDiv>
        <MinorsProhibitedDialog />
        <IdleWindow />
        <AxiosCenter.RenderLoadingElement />
        <SwitchRoute routes={routes} routesStep={0} />
        <CSSTransition
          timeout={200}
          in={announcementCoverState && isMobile} // 因要求從內存先把狀態改成 false
          classNames="CSSTransition_opacity"
          unmountOnExit
          key="CSSTransition_announcementCover"
        >
          <AnnouncementCover />
        </CSSTransition>
        <CSSTransition
          timeout={200}
          in={mentionAppCoverState}
          classNames="CSSTransition_opacity"
          unmountOnExit
          key="CSSTransition_mentionAppCover"
        >
          <MentionAppCover closeMentionAppCover={closeMentionAppCover} />
        </CSSTransition>
        <CSSTransition
          timeout={200}
          in={showOutOfQuota}
          classNames="CSSTransition_opacity"
          unmountOnExit
          key="CSSTransition_OutOfQuotaPortal"
        >
          <OutOfQuotaPortal />
        </CSSTransition>
        <ToastContainer
          className="toast_container"
          toastClassName="toast_container_item"
          position="bottom-center"
          autoClose={toastAutoCloseDuring}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <BottomNavBar showBottomNav={showBottomNav} />
      </RootDiv>
      <PCFooter PCFooterStatus={PCFooterStatus} />
    </I18nProvider>
  );
}

const AppStateToProps = (state) => {
  return {
    PCFooterStatus: state.pcFooter.show,
    showOutOfQuota: state.outOfQuotaData.show,
    user: state.user,
    location: state.router.location,
    mentionAppCoverState: state.showCoverCenter.mentionAppCover,
    announcementCoverState: state.showCoverCenter.announcementCover,
  };
};

const AppDispatchToProps = (dispatch) => {
  return {
    updateUserData: () => {
      dispatch(updateUserDataAction());
    },
    dataInit: () => {
      let storeData = store.getState();
      if (Object.keys(storeData.adsList).length === 0) {
        dispatch(getAdsData());
      }
      if (storeData.noticeList.length === 0) {
        dispatch(getNoticeData());
        dispatch(getConfigData());
      }
      dispatch(initRoutes());
    },
    toLogin: () => {
      dispatch(pushRoutes(login));
    },
    setBlockStateAction: (boolean) => {
      dispatch(blockStateAction(boolean));
    },
    toStartPage: () => {
      if (isMobile) {
        dispatch(pushRoutes(start));
      }
    },
    closeOutOfQuotaPortal: () => {
      dispatch(hideOutOfQuotaPortalAction());
    },
    closeMentionAppCover: () => {
      dispatch(toggleMentionAppCoverAction(false));
    },
    setPcFooter: (boolean) => {
      dispatch(setPcFooter(boolean));
    },
  };
};

export default withRouter(connect(AppStateToProps, AppDispatchToProps)(App));

const RootDiv = styled.div`
  /*  */
  margin: 0 auto;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
`;
