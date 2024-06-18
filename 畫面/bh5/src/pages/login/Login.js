import { useIntl } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "@emotion/styled/macro";

import banner from "../../assets/login/banner.jpg";

import SwitchRoute from "../component/SwitchRoute";

import ImageComponent from "../component/ImageComponent";

import TopBarContainer, {
  main_height,
  sub_height,
} from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import useMediaSetting from "../../reackHook/useMediaSetting";
import WebTopBar from "../homeMainSwitch/component/WebTopBar";
import React from "react";
import { bottom_nav_height } from "../component/BottomNavBar";

function Login({ routes, blockIn }) {
  const intl = useIntl();
  const { isMobile } = useMediaSetting();
  return (
    <LoginElement>
      <TopBarContainer show_shadow={false}>
        {isMobile ? (
          <TopTitleBar
            showBack={true && !blockIn}
            color="#000"
            back_color="transparent"
          />
        ) : (
          <React.Fragment>
            <WebTopBar />
            <TopTitleBar
              showBack={true && !blockIn}
              color="#000"
              back_color="transparent"
            />
          </React.Fragment>
        )}
      </TopBarContainer>
      <ImageComponent
        imgStyle={{ objectFit: isMobile ? "cover" : "contain" }}
        height={isMobile ? 60 : 18}
        border_radius={0}
        src={banner}
        alt="login banner"
        title={intl.formatMessage({ id: "LOGIN.WELCOME" })}
      />
      <div className="container">
        <SwitchRoute routes={routes} routesStep={2} />
      </div>
    </LoginElement>
  );
}

const LoginStateToProps = (state, ownProps) => {
  return {
    routes: ownProps.routes,
    blockIn: state.routesGuard.blockIn,
  };
};

const LoginDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(LoginStateToProps, LoginDispatchToProps)(Login)
);

const LoginElement = styled.div`
  /*  */
  padding-bottom: 5%;
  position: relative;
  z-index: 12;
  overflow: hidden;
  height: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background-color: #fff;
  @media (min-width: 599px) {
    padding-top: ${main_height}px;
  }
  .container {
    position: relative;
  }
`;
