import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "@emotion/styled/macro";

import SwitchRoute from "../component/SwitchRoute";


function HomeComicList({ routes }) {
  return (
    <HomeComicListElement>
      <div className="container">
        <SwitchRoute 
          routes={routes} 
          routesStep={3}
        />
      </div>
    </HomeComicListElement>
  );
}

const HomeComicListStateToProps = (state, ownProps) => {
  return {
    routes: ownProps.routes,
  };
};

const HomeComicListDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(HomeComicListStateToProps, HomeComicListDispatchToProps)(HomeComicList)
);

const HomeComicListElement = styled.div`/*  */
  .container {
    position: relative;
  }
`;
