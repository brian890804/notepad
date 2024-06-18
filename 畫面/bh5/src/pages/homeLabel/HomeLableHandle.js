import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getTabDataAction } from "./HomeLabelAction";
import HomeLabel from "./HomeLableRender";

const HomeLableStateToProps = (state) => {
  let title = state.router.location.pathname.split("/").splice(4).join("/");
  let type = state.router.location.pathname.split("/")[3];
  return {
    type: type,
    title: title,
    dataList: state.homeTagData[title]
      ? [...state.homeTagData[title].list]
      : [],
  };
};

const HomeLableDispatch = (dispatch) => {
  return {
    getTabData: (data, scrollColdEnd = () => {}) => {
      dispatch(getTabDataAction(data, scrollColdEnd));
    },
  };
};

export default withRouter(
  connect(HomeLableStateToProps, HomeLableDispatch)(HomeLabel)
);
