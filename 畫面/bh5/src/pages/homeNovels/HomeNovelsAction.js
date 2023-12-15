import axiosRequest from "../../modules/axiosItem";
import { requestUrlConstants } from "../../constants";
const { getNovelsTabUrl } = requestUrlConstants;

/**
 * @description get tab list
 *
 * @return {*} 
 */
export const getNovelsTabAction = () => {
  return function (dispatch) {
    axiosRequest.get(getNovelsTabUrl).then(data=>{
      dispatch({
        type: "INIT_NOVELSTAB",
        data
      })
    })
  }
}

/**
 * @description set now tab
 *
 * @param {*} id
 * @return {*}
 */
 export const setNowTabList = (id) => {
  return {
    type: "SETHOMENOVEL_NOWTAB",
    id,
  };
};