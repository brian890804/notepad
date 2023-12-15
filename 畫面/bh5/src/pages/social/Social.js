import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "@emotion/styled/macro";

import SwitchRoute from "../component/SwitchRoute";

function Social({ routes }) {
  return (
    <SocialElement>
      <div className="container">
        <SwitchRoute routes={routes} routesStep={2} />
      </div>
    </SocialElement>
  );
}

const SocialStateToProps = (state, ownProps) => {
  return {
    routes: ownProps.routes,
  };
};

const SocialDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(SocialStateToProps, SocialDispatchToProps)(Social)
);

const SocialElement = styled.div`/*  */
  .container {
    position: relative;
  }
`;
