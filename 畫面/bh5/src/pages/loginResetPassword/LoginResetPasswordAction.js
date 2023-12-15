import axiosRequest from "../../modules/axiosItem";
import { requestUrlConstants } from "../../constants";
const { getResetPassword } = requestUrlConstants;

/**
 * @description to reset password
 *
 * @return {*} 
 */
export const toResetPassword = (data, callback) => {
  return function (dispatch) {
    axiosRequest.get(getResetPassword, data).then(data => {
      callback(true);
    }).catch(()=>{
      callback(false);
    })
  }
}
