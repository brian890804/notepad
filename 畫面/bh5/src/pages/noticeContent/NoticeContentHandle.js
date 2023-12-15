import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import NoticeContentPage from "./NoticeContentRender";

import { ReadNotice } from "../../reducers/actions/noticeListRead";

const NoticeContentStateToProps = (state, ownProps) => {
  const noticeId = parseInt(ownProps.match.params.noticeId);
  let data = "";
  for(let i = 0 ; i < state.noticeList.length ; i++) {
    if(state.noticeList[i].id === noticeId) {
      data = state.noticeList[i];
      break;
    }
  }
  return {
    title: data.title || "",
    content: data.miaoshu,
    noticeId
  };
};


const NoticeContentDispatchToProps = (dispatch) => {
  return {
    readNotice: (noticeId)=>{
      dispatch(ReadNotice(noticeId));
    }
  };
};

const NoticeHandle = connect( NoticeContentStateToProps, NoticeContentDispatchToProps )(NoticeContentPage);

export default withRouter(NoticeHandle);