import { requestUrlConstants } from "../../constants";
import axiosRequest from "../../modules/axiosItem";
import { updateUserDataAction } from "../../reducers/actions/user";
import store from "../../store";

const { postUpdateUserAvatarUrl, postUpdateUserDataUrl } = requestUrlConstants;

export const updateUserAvatarAction = (fileData) => {
  return function (dispatch) {
    let formData = new FormData();
    formData.append("file", fileData);
    axiosRequest
      .post(
        postUpdateUserAvatarUrl + "?uid=" + store.getState().user.id,
        formData
      )
      .then((data) => {
        dispatch(updateUserDataAction());
      });
  };
};

export const editUserDataAction = (data) => {
  return function (dispatch) {
    let formData = new FormData();

    formData.append("uid", store.getState().user.id);
    for (let key in data) {
      formData.append(key, data[key]);
    }

    axiosRequest.post(postUpdateUserDataUrl, formData).then((data) => {
      dispatch(updateUserDataAction());
    });
  };
};
