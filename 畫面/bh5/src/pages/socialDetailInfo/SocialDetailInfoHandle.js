import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { pageUrlConstants } from "../../constants";
import { pushRoutes } from "../../reducers/actions/historyActions";
import store from "../../store";
import { addProfileCollectAction, getBuySocialProfileAction, getProfileDataAction } from "./SocialDetailInfoAction";
import SocialDetailInfo from "./SocialDetailInfoRender";



const { login } = pageUrlConstants;


const SocialDetailInfoStateToProps = (state) => {
  const profileId = state.router.location.pathname.split('/')[3];
  return {
    profileId: profileId,
    profileData: state.socialProfileData[profileId] ? {...state.socialProfileData[profileId]} : {}
  };
};

const SocialDetailInfoDispatchToProps = (dispatch) => {
  return {
    getProfileData: (profileId) => {
      dispatch(getProfileDataAction(profileId));
    },
    addProfileCollect: (profileId) => {
      if( store.getState().user.id === "guest") {
        dispatch(pushRoutes(login))
      } else {
        dispatch(addProfileCollectAction(profileId));
      }
    },
    unlockProfile: (profileData, successCallback = () => {}, failCallback = () => {}) => {
      if( store.getState().user.id === "guest") {
        dispatch(pushRoutes(login))
      } else {
        dispatch(getBuySocialProfileAction(profileData, successCallback, failCallback))
      }
    },
    toBuySexVip: () => {
      dispatch(pushRoutes(pageUrlConstants.profile.pages.profileBuyVip.pages.profileBuyVipSex));
    }
  };
};

export default withRouter(
  connect(SocialDetailInfoStateToProps, SocialDetailInfoDispatchToProps)(SocialDetailInfo)
);