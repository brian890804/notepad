import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "@emotion/styled/macro";

import SwitchRoute from "../component/SwitchRoute";
import ScrollToTop from "../component/ScrollToTop";

function Posts({ routes }) {
  return (
    <PostsElement>
      <ScrollToTop />
      <div className="container">
        <SwitchRoute routes={routes} routesStep={2} />
      </div>
    </PostsElement>
  );
}

const PostsStateToProps = (state, ownProps) => {
  return {
    routes: ownProps.routes,
  };
};

const PostsDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(PostsStateToProps, PostsDispatchToProps)(Posts)
);

const PostsElement = styled.div`
  /*  */
  .container {
    position: relative;
  }
`;
