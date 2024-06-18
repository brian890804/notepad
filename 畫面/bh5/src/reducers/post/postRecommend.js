import { decryptiedData } from "../../modules/aseItem";
const local = window.localStorage.getItem("contentData")
  ? JSON.parse(decryptiedData(window.localStorage.getItem("contentData")))
  : [];
const postRecommend = (state = local.postRecommend || [], action) => {
  switch (action.type) {
    case "INIT_POSTRECOMMEND":
      return [...action.data];
    default:
      return state;
  }
};

export default postRecommend;
