import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import HomeMainSwitchPage from "./HomeMainSwitchRender";
import { pushRoutes } from "../../reducers/actions/historyActions";
import { pageUrlConstants } from "../../constants";
import store from "../../store";
import { toggleHomeFloatAdsAction } from "../../reducers/actions/showCoverCenter";
import { updateRechargeStateAction } from "../../reducers/actions/config";

const { notice, home, login, profile } = pageUrlConstants;

const HomeMainSwitchStateToProps = (state, ownProps) => {
  let newNotice = 0;
  let noticeList = state.noticeList || [];
  let noticeListRead = state.noticeListRead || [];
  for (let i = 0; i < noticeList.length; i++) {
    if (noticeListRead.indexOf(noticeList[i].id) === -1) {
      newNotice++;
    }
  }
  return {
    user: state.user,
    category: state.homeCategory,
    config: state.config,
    newNotice,
    routes: ownProps.routes,
    homeFloatAdsState: state.showCoverCenter.homeFloatAds,
    highlightRechargeState: state.config.highlightRechargeState,
  };
};

const HomeMainSwitchDispatchToProps = (dispatch) => {
  return {
    clickAvatar: () => {
      // console.log("這邊要判斷登入狀態");
      const userData = store.getState().user;
      if (userData.id !== "guest") {
        dispatch(pushRoutes(profile));
      } else {
        dispatch(pushRoutes(login));
      }
    },
    clickSearch: () => {
      dispatch(pushRoutes(home.pages.homeSearch));
    },
    clickHome: () => {
      dispatch(pushRoutes(home.pages.homeMain));
    },
    clickNew: () => {
      dispatch(pushRoutes(notice));
    },
    clickTabLabel: (key, dynamic) => {
      console.log(key, "key");
      if (key === "ranking") {
        dispatch(
          pushRoutes(home.pages.homeLeaderboard.pages.homeLeaderboardComic)
        );
      } else if (key === "games") {
        dispatch(pushRoutes(home.pages.homeGame));
      } else {
        let upCass = key.slice(0, 1);
        upCass = upCass.toUpperCase();
        dispatch(
          pushRoutes({
            name: home.pages.homeMain.pages["home" + upCass + key.slice(1)]
              .name,
            path: home.pages.homeMain.pages["home" + upCass + key.slice(1)]
              .path,
            dynamic: {
              tab: dynamic,
            },
          })
        );
      }
      // dispatch(pushRoutes(home.pages.homeMain.pages["home" + upCass + key.slice(1) + (key === "videos" ? "Select" : "")])); 經討論 暫時拔掉影片過度頁
    },
    closeHomeFloatAds: () => {
      dispatch(toggleHomeFloatAdsAction(false));
    },
    toPaymentPage: () => {
      dispatch(updateRechargeStateAction(true));
      dispatch(pushRoutes(profile.pages.profilePayment));
    },
  };
};

const HomeMainSwitchHandle = connect(
  HomeMainSwitchStateToProps,
  HomeMainSwitchDispatchToProps
)(HomeMainSwitchPage);

export default withRouter(HomeMainSwitchHandle);
