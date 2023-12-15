import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import { colors } from "../../../constants";
import { main_height, sub_height } from "../../component/TopBarContainer";
import BundleFoldrComponent, {
  BundleFoldrComponentElement,
} from "../component/BundleFoldrComponent";
import BundleCapsuleComponent from "../component/BundleCapsuleComponent";

const ProfileBundleGift = (state) => {
  const intl = useIntl();
  return (
    <ProfileBundleGiftElement>
      <BundleFoldrComponent
        title={intl.formatMessage({ id: "PROFILE.BUILD.EFFECT.UNUSE" })}
      >
        <BundleCapsuleComponent />
        <BundleCapsuleComponent />
        <BundleCapsuleComponent />
        <BundleCapsuleComponent />
        {/* <BundleCouponComponent/> */}
      </BundleFoldrComponent>
      <BundleFoldrComponent
        title={intl.formatMessage({ id: "PROFILE.BUILD.EFFECT.USED" })}
      >
        <BundleCapsuleComponent />
        <BundleCapsuleComponent />
        <BundleCapsuleComponent />
        <BundleCapsuleComponent />
        {/* <BundleCouponComponent/> */}
      </BundleFoldrComponent>
      <BundleFoldrComponent
        title={intl.formatMessage({ id: "PROFILE.BUILD.EFFECT.UNEFFECT" })}
      >
        <BundleCapsuleComponent />
        <BundleCapsuleComponent />
        <BundleCapsuleComponent />
        <BundleCapsuleComponent />
        {/* <BundleCouponComponent/> */}
      </BundleFoldrComponent>
    </ProfileBundleGiftElement>
  );
};

export default ProfileBundleGift;

export const ProfileBundleGiftElement = styled.div`
  /*  */
  padding: 0.1px 0;
  box-sizing: border-box;
  min-height: calc(var(--vh, 1vh) * 100 - ${main_height + sub_height}px);
  background-color: ${colors.back_grey};

  ${BundleFoldrComponentElement} {
    margin-top: 10px;
  }
`;
