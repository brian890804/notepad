import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { pageUrlConstants } from "../../constants";
import { pushRoutes } from "../../reducers/actions/historyActions";
import store from "../../store";
import { getVendorGoodsAction, likeVendorGoodsAction } from "./VendorGoodsAction";

import VendorGoods from "./VendorGoodsRender";


const VendorGoodsStateToProps = (state) => {

  let goodsId = state.router.location.pathname.split("/")[3];

  return {
    goodsId: goodsId,
    goodsData: state.vendorData[goodsId] ? {...state.vendorData[goodsId]} : {}
  };
};

const VendorGoodsDispatchToProps = (dispatch) => {
  return {
    getVendorGoods: (goodsId) => {
      dispatch(getVendorGoodsAction(goodsId));
    },
    toVendorSheetPage: (goodsId, buyType) => {
      const vendorGoods = store.getState().vendorData[goodsId];
      dispatch(pushRoutes({
        name: pageUrlConstants.vendor.pages.vendorSheet.name + vendorGoods.title,
        path: pageUrlConstants.vendor.pages.vendorSheet.path,
        dynamic: {
          goodsId,
          buyType
        }
      }))
    },
    likeVendorGoodsEvent: (goodsId) => {
      dispatch(likeVendorGoodsAction(goodsId));
    }
  };
};

export default withRouter(
  connect(VendorGoodsStateToProps, VendorGoodsDispatchToProps)(VendorGoods)
);