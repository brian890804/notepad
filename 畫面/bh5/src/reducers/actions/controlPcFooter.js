/**
 * @description set pcfooter
 *
 * @return {*}
 */
export const setPcFooter = (boolean) => {
  return function (dispatch) {
    dispatch({
      type: "SET_PCFOOTER",
      show:boolean,
    });
  };
};
