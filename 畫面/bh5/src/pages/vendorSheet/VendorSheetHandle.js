import { useIntl } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { backRoutes } from "../../reducers/actions/historyActions";
import store from "../../store";
import { submitOrderAction } from "./VendorSheetAction";
import VendorSheetRender from "./VendorSheetRender";

const VendorSheetStateToProps = (state) => {
  let urlSplit = state.router.location.pathname.split("/");
  let goodsId = urlSplit[3];
  let buyType = urlSplit[4];
  
  return {
    user: state.user,
    goodsId,
    buyType,
    goodsData: state.vendorData[goodsId] ? {...state.vendorData[goodsId]} : {},
    config: state.config || {}
  };
};

const VendorSheetDispatchToProps = (dispatch) => {
  const intl = useIntl();
  return {
    backPage: () => {
      dispatch(backRoutes());
    },
    submitOrder: (rawData) => {
      let userId = store.getState().user.id;
      let data = {};
      data.uid = userId;
      data.sid = rawData.goodsId;
      data.select_pay_type = rawData.paymentType;
      data.to_username = rawData.receiverGift;
      data.area = rawData.receiverArea;
      data.address = rawData.receiverAddress;
      data.username = rawData.receiverName;
      data.phone = rawData.receiverPhone;
      data.area_code = rawData.receiverCode;
      data.isActual = rawData.isActual;
      if(rawData.selectCoupon) {
        data.coupon_id = rawData.selectCoupon.id;
      }
      dispatch(submitOrderAction(data,intl));
    }
  };
};

export default withRouter(
  connect(
    VendorSheetStateToProps,
    VendorSheetDispatchToProps
  )(VendorSheetRender)
);
