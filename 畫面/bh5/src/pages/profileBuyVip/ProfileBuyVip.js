import { useRef } from "react";
import { useIntl } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import styled from "@emotion/styled/macro";

import SwitchRoute from "../component/SwitchRoute";
import TopBarContainer, { main_height } from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import { pageUrlConstants } from "../../constants";
import { replaceRoutes } from "../../reducers/actions/historyActions";
import { bottom_nav_height } from "../component/BottomNavBar";

const { profile } = pageUrlConstants;

const ProfileBuyVip = ({ routes }) => {
  const intl = useIntl();
  const containerRef = useRef(null);
  return (
    <ProfileBuyVipElement>
      <TopBarContainer>
        <TopTitleBar
          showBack={true}
          show_back_color="#ffffff"
          title={intl.formatMessage({ id: "PROFILE.BUILD.LABEL.CARD.MEMBER" })}
        />
      </TopBarContainer>
      <div ref={containerRef} className="container">
        <SwitchRoute
          containerRef={containerRef}
          routes={routes}
          routesStep={3}
        />
      </div>
    </ProfileBuyVipElement>
  );
};

const ProfileBuyVipStateToProps = (state, ownProps) => {
  return {
    routes: ownProps.routes,
  };
};

const ProfileBuyVipDispatch = (dispatch) => {
  return {
    clickTabLabel: (key) => {
      let upCass = key.slice(0, 1);
      upCass = upCass.toUpperCase();
      dispatch(
        replaceRoutes(
          profile.pages.profileBuyVip.pages[
            "profileBuyVip" + upCass + key.slice(1)
          ]
        )
      );
    },
  };
};

export default withRouter(
  connect(ProfileBuyVipStateToProps, ProfileBuyVipDispatch)(ProfileBuyVip)
);

const ProfileBuyVipElement = styled.div`
  /*  */
  padding-top: ${main_height}px;
  padding-bottom: ${bottom_nav_height}px;

  .grid {
    background-color: #fff;
  }

  .container {
    position: relative;
  }
`;
