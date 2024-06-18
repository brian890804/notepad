import { connect } from "react-redux";
import { useIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import ImageCarousel from "../component/ImageCarousel";
import { adsKeys } from "../../constants";
import styled from "@emotion/styled/macro";
import TopBarContainer, {
  main_height,
  sub_height,
} from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import TopTabBar from "../component/TopTabBar";
import { replaceRoutes } from "../../reducers/actions/historyActions";
import { pageUrlConstants } from "../../constants";
import SwitchRoute from "../component/SwitchRoute";
import useMediaSetting from "../../reackHook/useMediaSetting";
import TopMiddleTabBar from "../component/TopMiddleTabBar";

const { home } = pageUrlConstants;

const HomeLeaderboard = ({ routes, clickTabLabel }) => {
  const intl = useIntl();
  const { isMobile } = useMediaSetting();

  let labelList = {
    comic: {
      name: intl.formatMessage({ id: "LEADERBOARD.TAB.H_COMIC" }),
    },
    anime: {
      name: intl.formatMessage({ id: "LEADERBOARD.TAB.H_ANIMATE" }),
    },
  };
  return (
    <HomeLeaderboardElement>
      <TopBarContainer>
        <TopTitleBar
          title={intl.formatMessage({ id: "LEADERBOARD" })}
          showBack={true}
          show_back_color="#ffffff"
        />
        <TopTabBar labelList={labelList} callback={clickTabLabel} disabledIndent />
      </TopBarContainer>
      <ImageCarousel
        adsKey={adsKeys.home}
        threeInOneBanner={!isMobile}
        is_cover
        size="banner_main"
      />
      <div className="container">
        <SwitchRoute routes={routes} routesStep={4} />
      </div>
    </HomeLeaderboardElement>
  );
};

const HomeLeaderboardStateToProps = (state, ownProps) => {
  return {
    routes: ownProps.routes,
  };
};

const HomeLeaderboardDispatchToProps = (dispatch) => {
  return {
    clickTabLabel: (key) => {
      let upCass = key.slice(0, 1);
      upCass = upCass.toUpperCase();
      dispatch(
        replaceRoutes(
          home.pages.homeLeaderboard.pages[
            "homeLeaderboard" + upCass + key.slice(1)
          ]
        )
      );
    },
  };
};

export default withRouter(
  connect(
    HomeLeaderboardStateToProps,
    HomeLeaderboardDispatchToProps
  )(HomeLeaderboard)
);

const HomeLeaderboardElement = styled.div`
  /*  */
  padding-top: ${main_height + sub_height}px;

  .container {
    position: relative;
  }
`;
