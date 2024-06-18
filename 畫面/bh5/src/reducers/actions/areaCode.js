import axiosRequest from "../../modules/axiosItem";
import { requestUrlConstants } from "../../constants";
const { getAreaCode } = requestUrlConstants;

/**
 * @description getAreaCodeData
 *
 * @return {*} 
 */
export const initAreaCode = () => {
  return function (dispatch) {
    axiosRequest.get(getAreaCode).then(data => {
      dispatch({
        type: "INIT_AREACODE",
        data
      })
    })
  }
}