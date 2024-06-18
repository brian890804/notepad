import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import NoticeListPage from "./NoticeListRender";

const NoticeListStateToProps = (state) => {
  for(let i = 0 ; i < state.noticeList.length ; i++){
    if(state.noticeListRead.indexOf(state.noticeList[i].id) === -1) {
      state.noticeList[i].isNew = true;
    } else {
      state.noticeList[i].isNew = false;
    }
  }
  return {
    noticeList: state.noticeList
  };
};


const NoticeListDispatchToProps = (dispatch) => {
  return {
  };
};

const NoticeListHandle = connect( NoticeListStateToProps, NoticeListDispatchToProps )(NoticeListPage);

export default withRouter(NoticeListHandle);