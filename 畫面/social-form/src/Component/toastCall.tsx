import { toast } from "react-toastify";
import { toastAutoCloseDuring } from "../constant";

let toastMsg: Array<string> = [];
const callToast = (data: string) => {
  for (let i = 0; i < toastMsg.length; i++) {
    if (toastMsg[i] === data) {
      return;
    }
  }
  toast(data);
  toastMsg.push(data);
  setTimeout(() => {
    toastMsg.splice(0, 1);
  }, toastAutoCloseDuring + 350);
};

export default callToast;
