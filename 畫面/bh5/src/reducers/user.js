/**
 * @description user data
 *
 * @param {string} [state={ id: "guest" }]
 * @param {*} action INIT_USER || STORE_TEMPORARYDATA
 * @return {*}
 */
const user = function (state = { id: "guest" }, action) {
  switch (action.type) {
    case "INIT_USER":
      return {
        ...state,
        ...action.data,
      };
    case "STORE_TEMPORARYDATA":
      return {
        ...state,
        temporaryData: action.data,
      };

    case "UPDATE_USEMONEY":
      state.sign = action.data.sign;
      state.money = action.data.money;
      return {
        ...state,
      };
    // case "INIT_USERVIDEOFAVOR":

    //   state.videoFavor = {};

    //   for(let i = 0 ; i < action.data.length ; i++) {
    //     state.videoFavor[action.data[i].id] = action.data[i];
    //   }

    //   return {
    //     ...state
    //   }

    case "ClEAR_USER":
      return { id: "guest" };
    default:
      return state;
  }
};

export default user;
