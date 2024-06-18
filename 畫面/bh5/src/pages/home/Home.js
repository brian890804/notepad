import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "@emotion/styled/macro";

import SwitchRoute from "../component/SwitchRoute";


function Home({ routes }) {
  return (
    <HomeElement>
      <div className="container">
        <SwitchRoute 
          routes={routes} 
          routesStep={2}
        />
      </div>
    </HomeElement>
  );
}

const HomeStateToProps = (state, ownProps) => {
  return {
    routes: ownProps.routes,
  };
};

const HomeDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(HomeStateToProps, HomeDispatchToProps)(Home)
);

const HomeElement = styled.div`/*  */
  .container {
    position: relative;
  }
`;
