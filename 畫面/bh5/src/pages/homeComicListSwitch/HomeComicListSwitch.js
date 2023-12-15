import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "@emotion/styled/macro";

import SwitchRoute from "../component/SwitchRoute";
import TopBarContainer, {
  main_height,
  sub_height,
} from "../component/TopBarContainer";
import TopBar from "../homeMainSwitch/component/TopBar";
import WebTopBar from "../homeMainSwitch/component/WebTopBar";
import { pushRoutes } from "../../reducers/actions/historyActions";
import useMediaSetting from "../../reackHook/useMediaSetting";
import { pageUrlConstants } from "../../constants";
import { bottom_nav_height } from "../component/BottomNavBar";

function HomeComicListSwitch({
  routes,
  clickSearch = (e) => e.stopPropagation(),
  clickAvatar,
  clickNew,
  newNotice,
  user,
  highlightRechargeState,
  toPaymentPage,
}) {
  const { isMobile } = useMediaSetting();
  return (
    <HomeComicListSwitchElement>
      <div className="container">
        <SwitchRoute routes={routes} routesStep={4} />
      </div>
    </HomeComicListSwitchElement>
  );
}

const { notice, home } = pageUrlConstants;
const HomeComicListSwitchStateToProps = (state, ownProps) => {
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

const HomeComicListSwitchDispatchToProps = (dispatch) => {
  return {
    clickSearch: () => {
      dispatch(pushRoutes(home.pages.homeSearch));
    },
    clickNew: () => {
      dispatch(pushRoutes(notice));
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
  };
};

export default withRouter(
  connect(
    HomeComicListSwitchStateToProps,
    HomeComicListSwitchDispatchToProps
  )(HomeComicListSwitch)
);

const HomeComicListSwitchElement = styled.div`
  /*  */
  // padding-top: ${main_height}px;
  // padding-bottom: ${bottom_nav_height}px;
  .container {
    position: relative;
  }
`;
