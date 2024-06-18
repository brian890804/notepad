// import axiosRequest from "../../modules/axiosItem"
// import { requestUrlConstants } from "../../constants"

// const { postGetNovelContent } = requestUrlConstants;

// export const getNovelContentAction = (id, callback) => {
//   return function(dispatch) {
//     axiosRequest.post(postGetNovelContent + "?id=" + id).then(data=>{
//       callback(data[0]);
//       dispatch({
//         type: "INIT_NOVELCONTENT",
//         data: data[0],
//         id
//       })
//     })
//   }
// }
