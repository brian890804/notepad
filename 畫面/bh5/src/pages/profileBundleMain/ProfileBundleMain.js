import { useEffect } from "react";
import { useIntl } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "@emotion/styled/macro";
import TopBarContainer, {
  main_height,
  sub_height,
} from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import TopTabBar from "../component/TopTabBar";
import SwitchRoute from "../component/SwitchRoute";
import { replaceRoutes } from "../../reducers/actions/historyActions";
import { pageUrlConstants, requestUrlConstants } from "../../constants";
import axiosRequest from "../../modules/axiosItem";
import store from "../../store";

const ProfileBundleMain = ({ routes, makeCouponRead, clickTabLabel }) => {
  const intl = useIntl();

  useEffect(() => {
    let formData = new FormData();
    formData.append("uid", store.getState().user.id);
    axiosRequest
      .post(requestUrlConstants.postReadCouponUrl, formData)
      .then(() => {
        makeCouponRead();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let labelList = {
    reward: {
      name: intl.formatMessage({ id: "PROFILE.BUILD.LABEL.REWARD" }),
    },
    coupon: {
      name: intl.formatMessage({ id: "PROFILE.BUILD.LABEL.COUPON" }),
    },
    // gift:{
    //   name: "礼物"
    // },
  };
  return (
    <ProfileBundleMainElement>
      <TopBarContainer show_shadow={false}>
        <TopTitleBar
          title={intl.formatMessage({ id: "PROFILE.BUILD.LABEL.MY_GIFT" })}
          showBack={true}
          show_back_color="#ffffff"
        />
        <TopTabBar labelList={labelList} callback={clickTabLabel} />
      </TopBarContainer>
      <div className="bundle_container">
        <SwitchRoute routes={routes} routesStep={3} />
      </div>
    </ProfileBundleMainElement>
  );
};

const ProfileBundleMainStateToProps = (state, ownProps) => {
  return {
    routes: ownProps.routes,
  };
};

const ProfileBundleMainDispatchToProps = (dispatch) => {
  return {
    clickTabLabel: (key) => {
      let upCass = key.slice(0, 1);
      upCass = upCass.toUpperCase();
      dispatch(
        replaceRoutes(
          pageUrlConstants.profile.pages.profileBundle.pages[
            "profileBundle" + upCass + key.slice(1)
          ]
        )
      );
    },
    makeCouponRead: () => {
      dispatch({
        type: "INIT_USER",
        data: {
          new_coupon_notification: false,
        },
      });
    },
  };
};

export default withRouter(
  connect(
    ProfileBundleMainStateToProps,
    ProfileBundleMainDispatchToProps
  )(ProfileBundleMain)
);

export const ProfileBundleMainElement = styled.div`
  /*  */
  padding-top: ${main_height + sub_height}px;

  .bundle_container {
    position: relative;
  }
`;
