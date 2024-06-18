import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { pageUrlConstants } from "../../constants";
import { pushRoutes } from "../../reducers/actions/historyActions";
import { getSocialLOCALAction } from "./SocialSelectLocalAction";

import SocialSelectLocal from "./SocialSelectLocalRender";

const { social } = pageUrlConstants;

const SocialSelectLocalStateToProps = (state, ownProps) => {
  return {
    routes: ownProps.routes,
  };
};

const SocialSelectLocalDispatchToProps = (dispatch) => {
  return {
    getSocialLOCAL: (callback) => {
      dispatch(getSocialLOCALAction(callback));
    },
    clickCitySearch: (city, cityId) => {
      let string = "?local=" + city;
      if(cityId) {
        string = string + "&id=" + cityId;
      }
      dispatch(pushRoutes({
        name: social.pages.socialList.name,
        path: social.pages.socialList.path + string,
      }))
    }
  };
};

export default withRouter(
  connect(SocialSelectLocalStateToProps, SocialSelectLocalDispatchToProps)(SocialSelectLocal)
);

