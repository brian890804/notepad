import { requestUrlConstants } from "../../constants";
import axiosRequest from "../../modules/axiosItem";
import callToast from "../../modules/toastCall";
import store from "../../store";

export const postBindInviteAction = (parentid, intl) => {
  return function () {
    let formData = new FormData();
    formData.append("uid", store.getState().user.id);
    formData.append("parentid", parentid);
    axiosRequest
      .post(requestUrlConstants.postBindInviteUrl, formData)
      .then(() => {
        callToast(intl.formatMessage({ id: "TOAST.TIP.SUCCESS.BIND" }));
      });
  };
};

export const postBindEmailAction = (email, intl) => {
  return function () {
    let formData = new FormData();
    formData.append("uid", store.getState().user.id);
    formData.append("email", email);
    axiosRequest
      .post(requestUrlConstants.postBindEmailUrl, formData)
      .then(() => {
        callToast(intl.formatMessage({ id: "TOAST.TIP.SUCCESS.BIND" }));
      });
  };
};
