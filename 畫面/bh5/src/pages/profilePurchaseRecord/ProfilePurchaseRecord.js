import { useIntl } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import styled from "@emotion/styled/macro";
import TopBarContainer, { main_height, sub_height } from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import TopTabBar from "../component/TopTabBar";
import SwitchRoute from "../component/SwitchRoute";
import { pageUrlConstants, requestUrlConstants } from "../../constants"
import axiosRequest from "../../modules/axiosItem";
import store from "../../store";
import { myBuyListLimit } from "../../reducers/myBuyList";
import { replaceRoutes } from "../../reducers/actions/historyActions";

const { profile } = pageUrlConstants

const ProfilePurchaseRecord = ({
  routes,
  clickTabLabel
}) => {
  const intl = useIntl();
  let labelList = {
    comic: {
      name: intl.formatMessage({ id: "PROFILE.PURCHASE.COMIC_H" })
    },
    anime: {
      name: intl.formatMessage({ id: "PROFILE.PURCHASE.ANIMATE" })
    },
    video: {
      name: intl.formatMessage({ id: "PROFILE.PURCHASE.VIDEO" })
    },
    novel: {
      name: intl.formatMessage({ id: "PROFILE.PURCHASE.NOVEL" })
    },
    photo: {
      name: intl.formatMessage({ id: "PROFILE.PURCHASE.MEITU" })
    },
    social: {
      name: intl.formatMessage({ id: "PROFILE.PURCHASE.AND_CHILL" })
    }
  }
  return (
    <ProfilePurchaseRecordElement>
      <TopBarContainer>
        <TopTitleBar
          title={intl.formatMessage({ id: "PROFILE.MAIN.OPTION.HISTORY.BUY" })}
          showBack={true}
          show_back_color="#ffffff"
        />
        <TopTabBar
          labelList={labelList}
          callback={clickTabLabel}
        />
      </TopBarContainer>
      <div className="container p-2">
        <SwitchRoute
          routes={routes}
          routesStep={3}
        />
      </div>
    </ProfilePurchaseRecordElement>
  );
};

const ProfilePurchaseRecordStateToProps = (state, ownProps) => {
  return {
    routes: ownProps.routes
  };
};

const ProfilePurchaseRecordDispatchToProps = (dispatch) => {
  return {
    clickTabLabel: (key) => {
      let upCass = key.slice(0, 1);
      upCass = upCass.toUpperCase();
      dispatch(replaceRoutes(profile.pages.profilePurchaseRecord.pages["profilePurchaseRecord" + upCass + key.slice(1)]));
    }
  };
};

export default withRouter(
  connect(
    ProfilePurchaseRecordStateToProps,
    ProfilePurchaseRecordDispatchToProps
  )(ProfilePurchaseRecord)
);

export const ProfilePurchaseRecordElement = styled.div`/*  */
padding-top: ${main_height + sub_height}px;

.container {
  position: relative;
}
`;

const { postGetUserBuyListtUrl } = requestUrlConstants;

export const getUserBuyAction = (type, scrollColdEnd= () => {}) => {
  return function (dispatch) {
    let storeData = store.getState();
    if (!storeData.myBuyList[type].idDone) {
      let formData = new FormData();
      formData.append("uid", storeData.user.id);
      formData.append("type", type);
      formData.append("page", storeData.myBuyList[type].page + 1);
      formData.append("limit", myBuyListLimit);
      axiosRequest.post(postGetUserBuyListtUrl, formData).then(data => {
        dispatch({
          type: "INIT_MYBUYLIST",
          kind: type,
          data
        })
        scrollColdEnd(false);
      })
    }
  }
}