import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import TopBarContainer, {
  main_height,
  sub_height,
} from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import TopTabBar from "../component/TopTabBar";
import SwitchRoute from "../component/SwitchRoute";

const ProfileMyCollect = ({ routes, clickTabLabel }) => {
  const intl = useIntl();
  let labelList = {
    comic: {
      name: intl.formatMessage({ id: "PROFILE.MY.COLLECT.COMIC" }),
    },
    anime: {
      name: intl.formatMessage({ id: "PROFILE.MY.COLLECT.ANIME" }),
    },
    video: {
      name: intl.formatMessage({ id: "PROFILE.MY.COLLECT.VIDEO" }),
    },
    novel: {
      name: intl.formatMessage({ id: "PROFILE.MY.COLLECT.NOVEL" }),
    },
    photo: {
      name: intl.formatMessage({ id: "PROFILE.MY.COLLECT.PHOTO" }),
    },
  };
  return (
    <ProfileMyCollectElement>
      <TopBarContainer>
        <TopTitleBar
          title={intl.formatMessage({ id: "PROFILE.MY.COLLECT.OWN.COLLECT" })}
          showBack={true}
          show_back_color="#ffffff"
        />
        <TopTabBar labelList={labelList} callback={clickTabLabel} />
      </TopBarContainer>
      <div className="container">
        <SwitchRoute routes={routes} routesStep={3} />
      </div>
    </ProfileMyCollectElement>
  );
};

export default ProfileMyCollect;

export const ProfileMyCollectElement = styled.div`
  /*  */
  padding-top: ${main_height + sub_height}px;

  .container {
    position: relative;
  }
`;
