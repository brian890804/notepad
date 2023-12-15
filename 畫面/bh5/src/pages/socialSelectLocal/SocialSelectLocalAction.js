import { requestUrlConstants } from "../../constants"
import axiosRequest from "../../modules/axiosItem"

const { getSocialLocalUrl } = requestUrlConstants;

export const getSocialLOCALAction = (callback) => {
  return function(dispatch) {
    axiosRequest.get(getSocialLocalUrl, {
      page: 1,
      limit: 999
    }).then(data=>{
      callback(data);
    })
  }
}