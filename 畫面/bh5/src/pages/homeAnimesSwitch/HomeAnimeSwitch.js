import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "@emotion/styled/macro";

import SwitchRoute from "../component/SwitchRoute";
import TopTitleBar from "../component/TopTitleBar";
import TopBarContainer, { main_height } from "../component/TopBarContainer";
import useMediaSetting from "../../reackHook/useMediaSetting";
import TopBar from "../homeMainSwitch/component/TopBar";
import WebTopBar from "../homeMainSwitch/component/WebTopBar";
import { pushRoutes } from "../../reducers/actions/historyActions";
import { pageUrlConstants } from "../../constants";
import { bottom_nav_height } from "../component/BottomNavBar";
import { updateRechargeStateAction } from "../../reducers/actions/config";
import store from "../../store";

const { login, profile } = pageUrlConstants;
function HomeAnimeSwitch({
  routes,
  clickSearch = (e) => e.stopPropagation(),
  clickAvatar,
  clickNew,
  clickHome,
  newNotice,
  user,
  highlightRechargeState,
  toPaymentPage,
}) {
  const { isMobile } = useMediaSetting();
  return (
    <HomeAnimeSwitchElement>
      <TopBarContainer>
        {isMobile ? (
          <TopBar
            isPlaceholder={true}
            newNotice={newNotice}
            clickSearch={clickSearch}
            clickHome={clickHome}
            clickAvatar={clickAvatar}
            clickNew={clickNew}
            avatar={user.avatar}
            userId={user.id}
            shareMa={user.share_ma}
            highlightRechargeState={highlightRechargeState}
            toPaymentPage={toPaymentPage}
          />
        ) : (
          <WebTopBar />
        )}
      </TopBarContainer>
      <div className="container">
        <SwitchRoute routes={routes} routesStep={3} />
      </div>
    </HomeAnimeSwitchElement>
  );
}
const { notice, home } = pageUrlConstants;
const HomeAnimeSwitchStateToProps = (state, ownProps) => {
  let newNotice = 0;
  let noticeList = state.noticeList || [];
  let noticeListRead = state.noticeListRead || [];
  for (let i = 0; i < noticeList.length; i++) {
    if (noticeListRead.indexOf(noticeList[i].id) === -1) {
      newNotice++;
    }
  }
  return {
    routes: ownProps.routes,
    user: state.user,
    category: state.homeCategory,
    config: state.config,
    newNotice,
    routes: ownProps.routes,
    homeFloatAdsState: state.showCoverCenter.homeFloatAds,
    highlightRechargeState: state.config.highlightRechargeState,
  };
};

const HomeAnimeSwitchDispatchToProps = (dispatch) => {
  return {
    clickSearch: () => {
      dispatch(pushRoutes(home.pages.homeSearch));
    },
    clickNew: () => {
      dispatch(pushRoutes(notice));
    },
    clickHome: () => {
      dispatch(pushRoutes(home.pages.homeMain));
    },
    clickTabLabel: (key) => {
      let upCass = key.slice(0, 1);
      upCass = upCass.toUpperCase();
      dispatch(
        pushRoutes(
          home.pages.homeMain.pages[
            "home" + upCass + key.slice(1)
            // "home" + upCass + key.slice(1) + (key === "videos" ? "Select" : "")經討論 暫時拔掉影片過度頁
          ]
        )
      );
      // dispatch(pushRoutes(home.pages.homeMain.pages["home" + upCass + key.slice(1) + (key === "videos" ? "Select" : "")])); 經討論 暫時拔掉影片過度頁
    },
    toPaymentPage: () => {
      dispatch(updateRechargeStateAction(true));
      dispatch(pushRoutes(profile.pages.profilePayment));
    },
    clickAvatar: () => {
      // console.log("這邊要判斷登入狀態");
      const userData = store.getState().user;
      if (userData.id !== "guest") {
        dispatch(pushRoutes(profile));
      } else {
        dispatch(pushRoutes(login));
      }
    },
  };
};

export default withRouter(
  connect(
    HomeAnimeSwitchStateToProps,
    HomeAnimeSwitchDispatchToProps
  )(HomeAnimeSwitch)
);

const HomeAnimeSwitchElement = styled.div`
  /*  */
  padding-top: ${main_height}px;
  padding-bottom: ${bottom_nav_height}px;
  .container {
    position: relative;
  }
`;
