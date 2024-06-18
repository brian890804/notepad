import { connect } from "react-redux";
import HomePhotosContentPage from "./HomePhotosContentRender";


import { checkinPageConditioncheckAction } from "../../reducers/actions/utilities";
import { toggleCollectAction } from "../../reducers/actions/toggleCollect";
// import { buyDownloadPhotoAction, getPhotoContentAction } from "./HomePhotosContentAction";
import { buyDownloadPhotoAction } from "./HomePhotosContentAction";

const HomePhotosContentStateToProps = (state) => {
  let photoId = state.router.location.pathname.split('/')[3];

  return {
    user: state.user,
    photoData: state.homePhotosContentData[photoId] ? state.homePhotosContentData[photoId] : {},
    photoId: photoId
  }
} 

const HomePhotosContentDispatchToProps = (dispatch) => {
  return {
    checkUser: (data) => {
      dispatch(checkinPageConditioncheckAction({
        itemId: data.id, 
        itemType: 1, 
        checkOnPage: true
      }))
    },
    // getPhotoContent: (id, callback) => {
    //   dispatch(getPhotoContentAction(id, callback));
    // },
    clickCollect: (data) => {
      dispatch(toggleCollectAction({
        id: data.id,
        type: 1,
        status: data.status
      }));
    },
    buyDownloadPhoto: (id, callback)=> {
      dispatch(buyDownloadPhotoAction(id, callback));
    }
  }
}

export default connect(HomePhotosContentStateToProps, HomePhotosContentDispatchToProps)(HomePhotosContentPage);