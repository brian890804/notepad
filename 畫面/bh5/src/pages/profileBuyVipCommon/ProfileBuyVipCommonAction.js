import axiosRequest from "../../modules/axiosItem";
import store from "../../store";
import { requestUrlConstants } from "../../constants";
import { updateUserDataAction } from "../../reducers/actions/user";
import callToast from "../../modules/toastCall";

const { getVipInfoDataUrl, getVipExchangeCodeUrl, postBuyVipMemberUrl } =
  requestUrlConstants;

export const setVipInfoAction = () => {
  return function (dispatch) {
    axiosRequest
      .get(getVipInfoDataUrl, {
        uid: store.getState().user.id,
      })
      .then((data) => {
        dispatch({
          type: "INIT_VIPINFODATA",
          data,
        });
      });
  };
};

export const exchangeVipCodeAction = (exchangeCode) => {
  return function (dispatch) {
    axiosRequest
      .get(getVipExchangeCodeUrl, {
        uid: store.getState().user.id,
        dianka: exchangeCode,
      })
      .then((data) => {
        dispatch(updateUserDataAction());
      });
  };
};

export const buyVipMemberAction = (vipInfo, intl) => {
  return function (dispatch) {
    const user = store.getState().user;
    let fromData = new FormData();

    fromData.append("fee", vipInfo.pay_price);
    fromData.append("name", vipInfo.outside_display_name);
    fromData.append("type_id", vipInfo.id);
    fromData.append("user_id", user.id);

    axiosRequest
      .post(postBuyVipMemberUrl, fromData)
      .then((data) => {
        dispatch(setVipInfoAction());
        dispatch(updateUserDataAction());

        callToast(intl.formatMessage({ id: "TOAST.TIP.BUY_SUCCESS_1" }));
      })
      .catch(() => {
        callToast(intl.formatMessage({ id: "TOAST.TIP.BUY_UNSUCCESS" }));
      });
  };
};

export const clearVipInfoAction = () => {
  return function (dispatch) {
    dispatch({
      type: "CLEAR_VIPINFODATA",
    });
  };
};
