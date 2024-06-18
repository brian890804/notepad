import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { pushRoutes } from "../../reducers/actions/historyActions";
import { pageUrlConstants } from "../../constants";
import store from "../../store";
import { toggleHomeFloatAdsAction } from "../../reducers/actions/showCoverCenter";
import { updateRechargeStateAction } from "../../reducers/actions/config";
import HomeProtocolPage from "./HomeProtocolRender";

const { notice, home, login, profile } = pageUrlConstants;

const HomeProtocolStateToProps = (state, ownProps) => {
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

const HomeProtocolDispatchToProps = (dispatch) => {
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
    closeHomeFloatAds: () => {
      dispatch(toggleHomeFloatAdsAction(false));
    },
    toPaymentPage: () => {
      dispatch(updateRechargeStateAction(true));
      dispatch(pushRoutes(profile.pages.profilePayment));
    },
  };
};

const HomeProtocolHandle = connect(
  HomeProtocolStateToProps,
  HomeProtocolDispatchToProps
)(HomeProtocolPage);

export default withRouter(HomeProtocolHandle);
