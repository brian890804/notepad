import { connect } from "react-redux";
import { withRouter } from "react-router";
import { addHistoryTabAcion, updateSearchResultAction } from "./HomeSearchResultAction";

import HomeSearchResultPage from "./HomeSearchResultRender";


const HomeSearchResultStateToProps = (state, ownProps) => {
  let pathneme = state.router.location.pathname;
  return {
    searchResult: state.homeSearchResultData,
    pathneme: pathneme,
    routes: ownProps.routes,
  }
};

const HomeSearchResultDispatchToProps = (dispatch) => {
  return {
    updateSearchResult : (pathneme, scrollColdEnd = () => {}) => {
      let path = pathneme.split("/");
      if(path[4] && path[5]) {
        dispatch(updateSearchResultAction(path[4], path[5], scrollColdEnd));
      }
    },
    addHistoryTab : (tab) => {
      dispatch(addHistoryTabAcion(tab));
    }
  };
};

const HomeSearchResultHandle = connect(
  HomeSearchResultStateToProps,
  HomeSearchResultDispatchToProps
)(HomeSearchResultPage);

export default withRouter(HomeSearchResultHandle);
