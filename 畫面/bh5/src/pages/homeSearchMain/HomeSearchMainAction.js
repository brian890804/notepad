import { requestUrlConstants } from "../../constants"
import axiosRequest from "../../modules/axiosItem"
import store from "../../store";


export const getSearchTabAction = () => {
  return function(dispatch) {
    let formData = new FormData();
    let user = store.getState().user;
    formData.append("id", user.id);
    axiosRequest.post(requestUrlConstants.postGetSearchTab, formData).then(data=>{
      let hotTab = data.search_hot;
      let historyTab = data.search_history;
      
      if(user.id === "guest") {
        historyTab = JSON.parse(localStorage.getItem("historyTab")) || [];
      }


      dispatch({
        type: "INIT_SEARCHTABLIST",
        hotTab,
        historyTab,
      })

    })
  }
}

export const clearHistoryAction = () => {
  return function(dispatch) {

    window.localStorage.removeItem("historyTab");

    dispatch({
      type: "CLEAR_HISTORYTAB"
    })
  }
}