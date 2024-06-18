import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getVendorGameListAction } from "../vendorMain/VendorMainAction";
import VendorCategory from "./VendorCategoryRender";

const VendorCategoryStateToProps = (state, ownProps) => {
  let vendorCategoryId = state.router.location.pathname.split("/")[3];
  return {
    vendorListData: state.vendorGameListData.vendorList || [],
    vendorCategoryId: vendorCategoryId,
    vendorCategoryTitle: state.router.location.query.title
      ? decodeURI(state.router.location.query.title)
      : "",
  };
};

const VendorCategoryDispatchToProps = (dispatch) => {
  return {
    updateVendorList: (type, categoryId, scrollColdEnd = () => {}) => {
      dispatch(getVendorGameListAction(type, categoryId, scrollColdEnd));
    },
    resetGameListData: (categoryId) => {
      dispatch({
        type: "RESET_VENDORGAMECATEGORYIDDATA",
        category_id: categoryId,
      });
    },
  };
};

export default withRouter(
  connect(
    VendorCategoryStateToProps,
    VendorCategoryDispatchToProps
  )(VendorCategory)
);
