// import { useEffect } from "react";
import { useIntl } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import styled from "@emotion/styled/macro";
import TopBarContainer, {
  main_height,
  sub_height,
} from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import TopTabBar from "../component/TopTabBar";
import SwitchRoute from "../component/SwitchRoute";
import { replaceRoutes } from "../../reducers/actions/historyActions";
import { pageUrlConstants } from "../../constants";
import * as utilitiesRequest from "../../reducers/cruds/utilitiesCRUD";

const { profile } = pageUrlConstants;
const ProfileWatchHistory = ({ routes, clickTabLabel }) => {
  const intl = useIntl();
  let labelList = {
    comic: {
      name: intl.formatMessage({ id: "PROFILE.PURCHASE.COMIC_H" }),
    },
    anime: {
      name: intl.formatMessage({ id: "PROFILE.PURCHASE.ANIMATE" }),
    },
  };
  return (
    <ProfileWatchHistoryElement>
      <TopBarContainer>
        <TopTitleBar
          title={intl.formatMessage({
            id: "PROFILE.MAIN.OPTION.HISTORY.WATCH",
          })}
          showBack={true}
          show_back_color="#ffffff"
        />
        <TopTabBar labelList={labelList} callback={clickTabLabel} />
      </TopBarContainer>
      <div className="container">
        <SwitchRoute routes={routes} routesStep={3} />
      </div>
    </ProfileWatchHistoryElement>
  );
};

const ProfileWatchStateToProps = (state, ownProps) => {
  return {
    routes: ownProps.routes,
  };
};

const ProfileWatchDispatchToProps = (dispatch) => {
  return {
    clickTabLabel: (key) => {
      console.log(key,'key')
      let upCass = key.slice(0, 1);
      upCass = upCass.toUpperCase();
      dispatch(
        replaceRoutes(
          profile.pages.profileWatchHistory.pages[
            "profileWatchHistory" + upCass + key.slice(1)
          ]
        )
      );
    },
  };
};

export default withRouter(
  connect(
    ProfileWatchStateToProps,
    ProfileWatchDispatchToProps
  )(ProfileWatchHistory)
);

export const ProfileWatchHistoryElement = styled.div`
  /*  */
  padding-top: ${main_height + sub_height}px;

  .container {
    position: relative;
  }
`;

/**
 * @export
 * @param {*} type 0:動畫 1:漫畫 沒帶:ALL
 * @return {*}
 */
export const postSearchWatchHistoryAction = (type) => (dispatch) => {
  return utilitiesRequest.postSearchWatchHistory(type).then((data) => {
    console.log(data,'data')
    if (data) {
      if (type) {
        dispatch({
          type: "INIT_MYWATCHHISTORY_COMIC",
          data,
        });
      } else {
        dispatch({
          type: "INIT_MYWATCHHISTORY_ANIME",
          data,
        });
      }
    }
  });
};
