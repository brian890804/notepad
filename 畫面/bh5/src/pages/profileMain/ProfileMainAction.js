import { requestUrlConstants } from "../../constants";
import axiosRequest from "../../modules/axiosItem";
import callToast from "../../modules/toastCall";
import { updateUserDataAction } from "../../reducers/actions/user";
import store from "../../store";

export const dailyLoginAction = (intl) => {
  return function (dispatch) {
    axiosRequest
      .get(
        requestUrlConstants.getUserDailyLogin,
        {
          uid: store.getState().user.id,
        },
        intl.formatMessage({ id: "TOAST.TIP.SUCCESS.REDEMPTIONED" })
      )
      .then((data) => {
        callToast(
          intl.formatMessage({ id: "TOAST.TIP.SUCCESS.REDEMPTION" }) +
            data +
            intl.formatMessage({ id: "GLOBAL.GOLD_MONEY" })
        );
        dispatch(updateUserDataAction());
      });
  };
};
