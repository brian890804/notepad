import styled from "@emotion/styled";
import adsImg from "../assets/ads.png";
const SectionAds = () => {
  return (
    <SectionAdsElement>
      <img src={adsImg} alt="ads background" />;
    </SectionAdsElement>
  );
};

export default SectionAds;
const SectionAdsElement = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  @media (min-width: 768px) {
    padding: 0 15em;
  }
`;
