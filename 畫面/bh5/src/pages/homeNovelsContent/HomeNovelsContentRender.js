import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled/macro";
import TopBarContainer, { main_height } from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import { padding } from "../../constants";
import { navigatorShare } from "../../reducers/actions/utilities";
import store from "../../store";

const HomeNovelsContent = ({
  checkUser,
  novelData,
  novelId,
  // getNovelContent,
  clickCollect,
}) => {
  const intl = useIntl();
  const [font_size, setFontSize] = useState(
    window.localStorage.getItem("novelsFontSize") || 16
  );

  const [share_ma] = useState(store.getState().user.share_ma);
  const [rangeShow, setRangeShow] = useState(true);

  useEffect(() => {
    if(novelId){
    if (!novelData.miaoshu) {
      // getNovelContent(novelId, (data)=>{
      checkUser({
        id: novelId,
      });
      // });
    }
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [novelId]);

  function clickCollectEven() {
    clickCollect({
      id: novelData.id,
      status: novelData.is_collect == 0 ? 1 : 0,
    });
  }
  function shareUrl() {
    navigatorShare({
      title: novelData.title,
      text:
        "B次元真的超好看！看看我在上面发现的" +
        novelData.title +
        "\n\n立刻免费成为B次元的小伙伴" +
        (share_ma ? "，输入我的邀请码" + share_ma : "") +
        "\n",
      url: window.location.href,
    });
  }
  return (
    <HomeNovelsContentElement>
      <TopBarContainer>
        <TopTitleBar
          title={novelData.title}
          showBack={true}
          show_back_color="#ffffff"
          iconCallback={clickCollectEven}
          iconState={novelData.is_collect}
        />
      </TopBarContainer>
      <div className="share" onClick={shareUrl}>
        <div className="share_label">
          <FontAwesomeIcon
            className="footer_content_box_btn_wava_icon"
            icon={faShareAlt}
          />
          &nbsp;
          {intl.formatMessage({ id: "GLOBAL.ACTION.SHARE" })}
        </div>
      </div>
      <div className={"text_size " + (rangeShow ? "show" : "")}>
        <p
          className="text_size_label"
          onClick={() => {
            setRangeShow(!rangeShow);
          }}
        >
          {intl.formatMessage({ id: "GLOBAL.SETTING" })}
        </p>
        <div className="text_size_range">
          <input
            className="text_size_range_input"
            type="range"
            min="12"
            max="60"
            step="1"
            value={font_size}
            onChange={(e) => {
              setFontSize(e.target.value);
              window.localStorage.setItem("novelsFontSize", e.target.value);
            }}
          />
        </div>
      </div>
      <div
        className="content fw-m"
        dangerouslySetInnerHTML={{
          __html: novelData.miaoshu,
        }}
        style={{
          fontSize: font_size + "px",
        }}
      />
    </HomeNovelsContentElement>
  );
};

export default HomeNovelsContent;

const HomeNovelsContentElement = styled.div`
  /*  */
  @media (min-width: 599px) {
    padding: ${main_height}px ${padding}px 0;
  }
  .share {
    position: fixed;
    bottom: 51px;
    display: flex;
    right: 0;
    align-items: center;
    padding: 8px;
    font-size: 16px;
    color: #fff;
    background-color: #000;
    opacity: 80%;
    transition: 0.1s;

    &_label {
      cursor: pointer;
      transition: 0.1s;
    }
  }
  .text_size {
    position: fixed;
    bottom: 50px;
    display: flex;
    align-items: center;
    padding: 5px;
    font-size: 16px;
    color: #fff;
    background-color: #000;
    opacity: 80%;
    transition: 0.1s;

    &_label {
      cursor: pointer;
      transition: 0.1s;
    }

    &_range {
      overflow: hidden;
      width: 0;
      transition: 0.1s;

      &_input {
        width: 100%;
      }
    }

    &.show {
      opacity: 70%;
      height: 30px;
      .text_size_label {
        color: #39b3fd;
      }

      .text_size_range {
        width: 300px;
        @media (max-width: 599px) {
          width: 150px;
        }
      }
    }
  }
  .content {
    letter-spacing: 1px;
    border-style: solid;
    border-color: gray;
    border-width: 1px;
    @media (min-width: 599px) {
      margin: 0 15%;
    }
    .p {
      margin-top: 1.2em;
      font-weight: 600;
      line-height: 1.2em;
    }
  }
`;
