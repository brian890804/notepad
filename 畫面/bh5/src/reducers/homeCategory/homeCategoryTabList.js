const homeCategoryTabList = (state = [], action) => {
  switch (action.type) {
    case "INIT_HOMECATEGORYTABLIST":
      return [...action.data]
    default:
      return state
  }
}

export default homeCategoryTabList;