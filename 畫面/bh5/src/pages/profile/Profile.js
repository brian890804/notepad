import React, { useRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import styled from "@emotion/styled/macro";

import SwitchRoute from "../component/SwitchRoute";

const Profile = ({ routes }) => {
  const containerRef = useRef(null);
  return (
    <ProfileElement>
      <SwitchRoute containerRef={containerRef} routes={routes} routesStep={2} />
    </ProfileElement>
  );
};

const ProfileStateToProps = (state, ownProps) => {
  return {
    routes: ownProps.routes,
  };
};

const ProfileDispatch = (dispatch) => {
  return {};
};

export default withRouter(
  connect(ProfileStateToProps, ProfileDispatch)(Profile)
);

const ProfileElement = styled.div`
  /*  */
`;
