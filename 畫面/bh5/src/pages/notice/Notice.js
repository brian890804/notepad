import React from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import styled from "@emotion/styled/macro";



import SwitchRoute from "../component/SwitchRoute";

function Notice({ routes }) {


  return (
    <NoticeElement>
      <SwitchRoute 
        routes={routes}
        routesStep={2}
      />
    </NoticeElement>
  );
}


const NoticeStateToProps = (state, ownProps) => {
  return {
    routes: ownProps.routes
  }
}

const NoticeDispatchToProps = (dispatch) => {
  return {
  }
}

export default withRouter(connect(NoticeStateToProps, NoticeDispatchToProps)(Notice));


const NoticeElement = styled.div`/*  */
`;