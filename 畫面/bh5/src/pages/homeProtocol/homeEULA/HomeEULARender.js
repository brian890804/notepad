import styled from "@emotion/styled/macro";
import { useIntl } from "react-intl";
import { colors } from "../../../constants";
import { main_height } from "../../component/TopBarContainer";
import { preZhBlock } from "./font/zh";
import { preEnBlock } from "./font/en";
import { nowLang } from "../../../i18n/Metronici18n";
const HomeEULARender = () => {
  const intl = useIntl();
  function getNowText() {
    if (nowLang === "en") return preEnBlock;
    return preZhBlock;
  }
  return (
    <HomeEULAPageElement>
      <div className="EULA_title">
        {intl.formatMessage({ id: "HOME.EULA.TITLE" })}
      </div>
      <div dangerouslySetInnerHTML={getNowText()} />
    </HomeEULAPageElement>
  );
};

export default HomeEULARender;

const HomeEULAPageElement = styled.div`
  /*  */
  padding-top: ${main_height}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .EULA_title {
    place-self: self-start;
    font-weight: 600;
    font-size: 1.5rem;
    padding-left: 12em;
    padding-bottom: 1em;
  }
  pre {
    font-size: 1rem;
    white-space: pre-wrap;
    line-height: 1rem;
    background-color: ${colors.back_grey};
    padding: 2em 5em;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 70vh;
    max-width: 70vw;
  }
`;
