import { connect } from "react-redux";
import { withRouter } from "react-router";
import { backRoutes, pushRoutes, replaceRoutes } from "../../reducers/actions/historyActions";

import { pageUrlConstants } from "../../constants";
import HomeSearchPage from "./HomeSearchRender";
import store from "../../store";

const { home } = pageUrlConstants;


const HomeSearchStateToProps = (state, ownProps) => {
  let pathneme = state.router.location.pathname.split("/");
  return {
    searchName: pathneme[4],
    routes: ownProps.routes
  };
};

const HomeSearchDispatchToProps = (dispatch) => {
  return {
    clickTopBackArrow: () => {
      dispatch(backRoutes());
    },
    searchBarKeyDown: (e) => {
      var key = window.event ? e.keyCode : e.which;
      if(key === 13) {
        dispatch(pushRoutes({
          name:  home.pages.homeSearch.pages.homeSearchResult.pages.homeSearchResultSAC.name + e.target.value,
          path: home.pages.homeSearch.pages.homeSearchResult.pages.homeSearchResultSAC.path,
          dynamic: {
            search: e.target.value 
          }
        }))
      }
    },
    clickTabLabel: (key) => {
      let pathneme = store.getState().router.location.pathname.split("/");
      dispatch(replaceRoutes({
        name: home.pages.homeSearch.pages.homeSearchResult.pages["homeSearchResult" + key].name + pathneme[4],
        path: home.pages.homeSearch.pages.homeSearchResult.pages["homeSearchResult" + key].path,
        dynamic: {
          search: pathneme[4]
        }
      }));
    },
  };
};

const HomeSearchHandle = connect(
  HomeSearchStateToProps,
  HomeSearchDispatchToProps
)(HomeSearchPage);

export default withRouter(HomeSearchHandle);
