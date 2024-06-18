import axiosRequest from "../../modules/axiosItem";
import { requestUrlConstants } from "../../constants";
const { getStreamListUrl } = requestUrlConstants;

/**
 * @description get stream list
 *
 * @return {*} 
 */
export const getStreamListAction = () => {
  return function (dispatch) {
    axiosRequest.get(getStreamListUrl).then(data=>{
      dispatch({
        type: "INIT_STREAMLIST",
        data
      })
    })
  }
}