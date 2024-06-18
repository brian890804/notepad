import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "@emotion/styled/macro";

import SwitchRoute from "../component/SwitchRoute";

function Vendor({ routes }) {
  return (
    <VendorElement>
      <div className="container">
        <SwitchRoute routes={routes} routesStep={2} />
      </div>
    </VendorElement>
  );
}

const VendorStateToProps = (state, ownProps) => {
  return {
    routes: ownProps.routes,
  };
};

const VendorDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(VendorStateToProps, VendorDispatchToProps)(Vendor)
);

const VendorElement = styled.div`/*  */
  .container {
    position: relative;
  }
`;
