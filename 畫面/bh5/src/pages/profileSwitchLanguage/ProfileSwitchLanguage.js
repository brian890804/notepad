import { useIntl } from "react-intl";
import { connect } from "react-redux";
import { useLang } from "../../i18n/Metronici18n";
import { withRouter } from "react-router";
import styled from "@emotion/styled/macro";

import TopBarContainer, { main_height } from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import LanguageListItem from "./component/LanguageListItem";
import { pageUrlConstants } from "../../constants";
import { replaceRoutes } from "../../reducers/actions/historyActions";

const { profile } = pageUrlConstants;

const ProfileSwitchLanguage = () => {
  const intl = useIntl();
  const lang = useLang();

  const LanguageList = [
    { name: "簡體中文", lang: "zh" },
    // { name: "繁體中文", lang: "zh" },
    { name: "English", lang: "en" },
  ];
  const currentLanguage = LanguageList.find((x) => x.lang === lang);
  return (
    <ProfileSwitchLanguageElement>
      <TopBarContainer>
        <TopTitleBar
          title={intl.formatMessage({
            id: "PROFILE.MAIN.OPTION.SWITCH_LANGUAGE",
          })}
          show_back_color="#ffffff"
          showBack={true}
        />
      </TopBarContainer>
      <LanguageListItem list={LanguageList} currentLanguage={currentLanguage} />
    </ProfileSwitchLanguageElement>
  );
};

const ProfileSwitchLanguageStateToProps = (state, ownProps) => {
  return {
    routes: ownProps.routes,
  };
};

const ProfileSwitchLanguageDispatch = (dispatch) => {
  return {
    clickTabLabel: (key) => {
      let upCass = key.slice(0, 1);
      upCass = upCass.toUpperCase();
      dispatch(
        replaceRoutes(
          profile.pages.ProfileSwitchLanguage.pages[
            "ProfileSwitchLanguage" + upCass + key.slice(1)
          ]
        )
      );
    },
  };
};

export default withRouter(
  connect(
    ProfileSwitchLanguageStateToProps,
    ProfileSwitchLanguageDispatch
  )(ProfileSwitchLanguage)
);

const ProfileSwitchLanguageElement = styled.div`
  /*  */
  padding-top: ${main_height}px;

  .grid {
    background-color: #fff;
  }

  .container {
    position: relative;
  }
`;
