import styled from "@emotion/styled/macro";
import useMediaSetting from "../../reackHook/useMediaSetting";

import SwitchRoute from "../component/SwitchRoute";
import TopBarContainer, { sub_height } from "../component/TopBarContainer";
import TopBar from "../homeMainSwitch/component/TopBar";
import WebTopBar from "../homeMainSwitch/component/WebTopBar";
const HomeProtocolRender = ({
  clickSearch = (e) => e.stopPropagation(),
  clickAvatar,
  clickNew,
  newNotice,
  clickHome,
  routes,
  user,
  highlightRechargeState,
  toPaymentPage,
}) => {
  const { isMobile } = useMediaSetting();
  return (
    <HomeProtocolRenderElement>
      <TopBarContainer>
        {isMobile ? (
          <TopBar
            isPlaceholder={true}
            newNotice={newNotice}
            clickSearch={clickSearch}
            clickHome={clickHome}
            shareMa={user?.share_ma}
            clickAvatar={clickAvatar}
            clickNew={clickNew}
            avatar={user?.avatar}
            userId={user?.id}
            highlightRechargeState={highlightRechargeState}
            toPaymentPage={toPaymentPage}
          />
        ) : (
          <WebTopBar />
        )}
      </TopBarContainer>
      <div className="container">
        <SwitchRoute routes={routes} routesStep={5} exact={true} />
      </div>
    </HomeProtocolRenderElement>
  );
};

export default HomeProtocolRender;

const HomeProtocolRenderElement = styled.div`
  /*  */
  padding: ${sub_height}px 0;

  .container {
    position: relative;
  }
`;
