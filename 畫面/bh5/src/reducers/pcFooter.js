/**
 * @description 控制PCfooter顯現
 *
 * @param {*} [state={}]
 * @param {*} action
 * @return {*}
 */
const pcFooter = function (
  state = {
    show: false,
  },
  action
) {
  switch (action.type) {
    case "SET_PCFOOTER":
      return {
        show: action.show,
      };
    default:
      return state;
  }
};

export default pcFooter;
