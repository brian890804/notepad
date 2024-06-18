import { dismissPreventPageScroll, preventPageScroll } from "./actions/utilities";

const outOfQuotaData = (state = {
  show: false,
  buy_id: 0,
  buy_type: 0, // 0 小說 1 插圖吧? 2 漫畫 3 動畫 4 影片
  gold: 0,
  episode: 0,
  checkOnPage: false
}, action) =>{
  switch (action.type) {
    case "CLOSE_OUTOFQUOTAPORTAL":
      state.show = false;
      state.checkOnPage = false;
      dismissPreventPageScroll();
      return {
        ...state
      };
    case "SET_OUTOFQUOTADATA":
      state.buy_id= action.buy_id;
      state.buy_type= action.buy_type;
      state.gold = action.gold;
      state.episode = action.episode;
      state.checkOnPage = action.checkOnPage;
      state.show = action.show;
      preventPageScroll();
      return {
        ...state
      }

    default:

      return state;
  }
}

export default outOfQuotaData;