import { connect } from "react-redux";
import { withRouter } from "react-router";
import { toggleCollectAction } from "../../reducers/actions/toggleCollect";
import { checkinPageConditioncheckAction } from "../../reducers/actions/utilities";
// import { getNovelContentAction } from "./HomeNovelsContentAction";

import HomeNovelsContent from "./HomeNovelsContentRender";

const HomeNovelsContentStateToProps = (state) => {
  let novelId = state.router.location.pathname.split('/')[3];
  return {
    novelData: state.homeNovelsContentData[novelId] ? state.homeNovelsContentData[novelId] : {},
    novelId: novelId
  }
}

const HomeNovelsContentDispatchToProps = (dispatch) => {
  return {
    checkUser: (data) => {
      dispatch(checkinPageConditioncheckAction({
        itemId: data.id, 
        itemType: 0, 
        checkOnPage: true
      }))
    },
    // getNovelContent: (id, callback) => {
    //   dispatch(getNovelContentAction(id, callback));
    // },
    clickCollect: (data) => {
      dispatch(toggleCollectAction({
        id: data.id,
        type: 0,
        status: data.status
      }));
    }
  }
}

export default withRouter(connect(HomeNovelsContentStateToProps, HomeNovelsContentDispatchToProps)(HomeNovelsContent));