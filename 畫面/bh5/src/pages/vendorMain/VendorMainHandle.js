import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import VendorMainPage from "./VendorMainRender";
import { getVendorListAction } from "./VendorMainAction";

const VendorMainStateToProps = (state) => {
  return {
    user: state.user,
    vendorListData: state.vendorListData.list,
  };
};

const VendorMainDispatchToProps = (dispatch) => {
  return {
    initVendorList: () => {
      dispatch(getVendorListAction());
    },
  };
};

const VendorMainHandle = connect(
  VendorMainStateToProps,
  VendorMainDispatchToProps
)(VendorMainPage);

export default withRouter(VendorMainHandle);
