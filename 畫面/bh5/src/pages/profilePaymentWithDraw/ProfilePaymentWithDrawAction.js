import { requestUrlConstants } from "../../constants";
import axiosRequest from "../../modules/axiosItem";
import callToast from "../../modules/toastCall";
import { updateUserDataAction } from "../../reducers/actions/user";
import store from "../../store";

export const postWithDrawAction = (amount, QQAccount) => {
  let formData = new FormData();
  formData.append("uid", store.getState().user.id);
  formData.append("amount", amount);
  formData.append("contact", QQAccount);
  return function (dispatch) {
    axiosRequest.post(requestUrlConstants.postWithDraw, formData).then(() => {
      callToast("提现申请完成，请等待审核");
      dispatch(updateUserDataAction());
    });
  };
};
