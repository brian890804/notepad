import callToast from "../../Component/toastCall";
import type { IUseState } from "../../Pages/SocialForm";
import * as requestFromServer from "./Crud";

export const getFieldData = (
  setSelectProps: (data: UseStore.SelectProps) => void
) => {
  return requestFromServer.getFieldData().then((response) => {
    const res = response.data;
    switch (res.code) {
      case "1":
        return setSelectProps(res.data);
      default:
        return callToast(res.msg);
    }
  });
};

export const postCreateProfile = (
  values: Public.MyFormValues,
  img: Array<IUseState>,
  setAlertStatus: (status: UseStore.AlertDialog) => void
) => {
  return requestFromServer.postCreateProfile(values, img).then((response) => {
    const res = response.data;
    switch (res.code) {
      case "1":
        return setAlertStatus({
          status: true,
          title: "提示",
          content: res.msg + "等待审核中....可以关闭视窗",
        });
      default:
        return setAlertStatus({
          status: true,
          title: "提示",
          content: res.msg,
        });
    }
  });
};

export const getUserProfile = (
  setAlertStatus: (status: UseStore.AlertDialog) => void
) => {
  return requestFromServer.getUserProfile().then((response) => {
    const res = response.data;
    switch (res.code) {
      case "1":
        if (Object.values(res.data).length) {
          setAlertStatus({
            status: true,
            title: "提示",
            content: "交友档案已存在，如需更动请联络管理员",
          });
        }
        break;
      default:
        return;
      // setAlertStatus({
      //   status: true,
      //   title: "提示",
      //   content: res.msg,
      // });
    }
  });
};
