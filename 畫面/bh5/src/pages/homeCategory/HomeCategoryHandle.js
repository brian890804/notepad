import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import HomeCategoryPage from "./HomeCategoryRender";

import {
  getCategoryDataAction,
  getCategoryListAction,
  restCategoryDataAction,
} from "./HomeCategoryAction";

const HomeCategoryStateToProps = (state) => {
  const regex = /\/category\/(.+)/;
  let match = state.router.location.pathname.match(regex);
  const title = match && match[1];
  return {
    title: title,
    dataLlist: state.homeCategoryData[title]
      ? [...state.homeCategoryData[title].list]
      : [],
    selectCategory: state.homeCategoryData[title]?.select_tag_gp||[], //點選廣告內部鏈結才會有的
    tabList: state.homeCategoryTabList,
  };
};

const HomeCategoryDispatchToProps = (dispatch) => {
  return {
    getCategoryList: (getTabHeight) => {
      dispatch(getCategoryListAction(getTabHeight));
    },
    getCategoryData: (data, scrollColdEnd = () => {}) => {
      dispatch(getCategoryDataAction(data, scrollColdEnd));
    },
    resetSetCategoryData: (category) => {
      dispatch(restCategoryDataAction(category));
    },
  };
};

export default withRouter(
  connect(
    HomeCategoryStateToProps,
    HomeCategoryDispatchToProps
  )(HomeCategoryPage)
);
