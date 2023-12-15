import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "@emotion/styled/macro";

import SwitchRoute from "../component/SwitchRoute";
import TopBarContainer, { main_height } from "../component/TopBarContainer";
import TopBar from "../homeMainSwitch/component/TopBar";
import WebTopBar from "../homeMainSwitch/component/WebTopBar";
import { pageUrlConstants } from "../../constants";
import { pushRoutes } from "../../reducers/actions/historyActions";
import useMediaSetting from "../../reackHook/useMediaSetting";
import { bottom_nav_height } from "../component/BottomNavBar";
import store from "../../store";
import { updateRechargeStateAction } from "../../reducers/actions/config";
const { login, profile } = pageUrlConstants;
function HomeVideoSwitch({
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
    <HomeVideoSwitchElement>
      <TopBarContainer>
        {isMobile ? (
          <TopBar
            isPlaceholder={true}
            newNotice={newNotice}
            clickSearch={clickSearch}
            clickHome={clickHome}
            clickAvatar={clickAvatar}
            shareMa={user.share_ma}
            clickNew={clickNew}
            avatar={user.avatar}
            userId={user.id}
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
    </HomeVideoSwitchElement>
  );
}

const { notice, home } = pageUrlConstants;
const HomeVideoSwitchStateToProps = (state, ownProps) => {
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

const HomeVideoSwitchDispatchToProps = (dispatch) => {
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
    clickAvatar: () => {
      // console.log("這邊要判斷登入狀態");
      const userData = store.getState().user;
      if (userData.id !== "guest") {
        dispatch(pushRoutes(profile));
      } else {
        dispatch(pushRoutes(login));
      }
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
  };
};

export default withRouter(
  connect(
    HomeVideoSwitchStateToProps,
    HomeVideoSwitchDispatchToProps
  )(HomeVideoSwitch)
);

const HomeVideoSwitchElement = styled.div`
  /*  */
  padding-top: ${main_height}px;
  padding-bottom: ${bottom_nav_height}px;
  .container {
    position: relative;
  }
`;
