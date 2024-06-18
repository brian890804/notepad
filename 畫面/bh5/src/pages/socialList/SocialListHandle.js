import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SocialListPage from "./SocialListRender";

import { getSocialListAction } from "./SocialListAction";
import { pushRoutes } from "../../reducers/actions/historyActions";
import { pageUrlConstants } from "../../constants";

const { social } = pageUrlConstants;

const SocialListStateToProps = (state) => {
  let citId = state.router.location.query.id;
  return {
    token: state.user.token,
    citId: citId,
    localName: state.router.location.query.local
      ? decodeURI(state.router.location.query.local)
      : "全部",
    isDone: state.socialListData[citId]
      ? state.socialListData[citId].idDone
      : "",
    list: state.socialListData[citId]
      ? [...state.socialListData[citId].socialList]
      : [],
  };
};

const SocialListDispatchToProps = (dispatch) => {
  return {
    updateSociaktData: (citId, scrollColdEnd = () => {}) => {
      dispatch(getSocialListAction(citId, scrollColdEnd));
    },
    clickSocialCardEvent: (socialId, nick_name) => {
      dispatch(
        pushRoutes({
          name: social.pages.socialDetailInfo.name + nick_name,
          path: social.pages.socialDetailInfo.path,
          dynamic: {
            profileId: socialId,
          },
        })
      );
    },
  };
};

const SocialListHandle = connect(
  SocialListStateToProps,
  SocialListDispatchToProps
)(SocialListPage);

export default withRouter(SocialListHandle);
