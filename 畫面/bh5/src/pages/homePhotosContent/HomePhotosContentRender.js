import { useEffect, useState, useRef } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import TopBarContainer from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";

import bookIcon from "../../assets/icons/book.svg";
import bookOpenIcon from "../../assets/icons/book_open.svg";
import scrollIcon from "../../assets/icons/scroll.svg";
import starIcon from "../../assets/icons/star.svg";
import starFillIcon from "../../assets/icons/star_fill.svg";
import downloadIcon from "../../assets/icons/download.svg";
import WavaButton from "../component/WavaButton";
import ImageComponent from "../component/ImageComponent";
import { colors, padding, pageUrlConstants } from "../../constants";
import LinkComponent from "../component/LinkComponent";
import axiosRequest from "../../modules/axiosItem";
import callToast from "../../modules/toastCall";
import { CSSTransition } from "react-transition-group";
import useMediaSetting from "../../reackHook/useMediaSetting";

let mouseMoveBasePoint = 0;
let move = 0;

const HomePhotosContent = ({
  user,
  photoId,
  photoData,
  checkUser,
  clickCollect,
  // getPhotoContent,
  buyDownloadPhoto,
}) => {
  const { isMobile } = useMediaSetting();
  const intl = useIntl();

  const navRef = useRef(null);

  let [view_type, setView_type] = useState(0); // 0 scroll 1 swiper

  const [photos_list, set_photos_list] = useState([]);

  let [photos_pages, set_photos_pages] = useState(0);
  const [show_setphotos_pages, set_show_setphotos_pages] = useState(false);
  const [show_buy_pic, set_show_buy_pic] = useState(false);

  const [photos_pages_offset, set_photos_pages_offset] = useState(0);

  const [showOptionNav, setShowOptionNav] = useState(true);

  useEffect(() => {
    if (!photoData.miaoshu && photoId) {
      // getPhotoContent(photoId, (data) => {
      checkUser({
        id: photoId,
      });
      // });;
    }

    // 用 [1來用]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoId]);

  useEffect(() => {
    if (photoData.miaoshu) {
      const myRegex = /src="([^"]*)/gm;
      const matches = photoData.miaoshu.matchAll(myRegex);
      const matchArr = [...matches];
      set_photos_list(matchArr);
    }
  }, [photoData.miaoshu]);

  useEffect(() => {
    window.removeEventListener("scroll", scrollEvent);
    window.addEventListener("scroll", scrollEvent);

    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view_type]);

  function scrollEvent(e) {
    if (!view_type) {
      const container_card = document.getElementsByClassName("container_card");
      const windowBottom = Math.abs(
        document.documentElement.getBoundingClientRect().top
      );

      for (let i = 0; i < container_card.length; i++) {
        if (windowBottom <= container_card[i].offsetTop) {
          set_photos_pages(i);
          return;
        }
      }
    }
  }

  function clickCollectEven() {
    clickCollect({
      id: photoData.id,
      status:
        typeof photoData.is_collect === "number"
          ? photoData.is_collect === 1
            ? 0
            : 1
          : 1,
    });
  }

  function scrollToImage() {
    window.scroll({
      top: document.getElementsByClassName("container_card")[photos_pages]
        .offsetTop,
      left: 0,
    });
  }

  function pagesRangeChange(e) {
    photos_pages = parseInt(e.target.value);
    set_photos_pages(photos_pages);
    if (!view_type) {
      scrollToImage();
    }
  }

  function sliderStart(e) {
    if (view_type) {
      mouseMoveBasePoint = e.changedTouches
        ? e.changedTouches[0].clientX || 0
        : e.clientX;
      move = 0;
      window.addEventListener("mousemove", sliderMove);
      window.addEventListener("touchmove", sliderMove);
      window.addEventListener("mouseup", sliderDone);
      window.addEventListener("mouseout", sliderDone);
      window.addEventListener("touchend", sliderDone);
    }
  }

  function sliderMove(e) {
    move =
      (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) -
      mouseMoveBasePoint;
    if (photos_pages === 0 && move > 0) {
      move = 0;
    } else if (photos_pages === photos_list.length - 1 && move < 0) {
      move = 0;
    }
    set_photos_pages_offset(move);
  }

  function sliderDone(e) {
    window.removeEventListener("mousemove", sliderMove);
    window.removeEventListener("touchmove", sliderMove);
    window.removeEventListener("mouseup", sliderDone);
    window.removeEventListener("mouseout", sliderDone);
    window.removeEventListener("touchend", sliderDone);
    if (move >= 100) {
      set_photos_pages(photos_pages - 1);
    } else if (move <= -100) {
      set_photos_pages(photos_pages + 1);
    }
    set_photos_pages_offset(0);
  }

  function clickPayDownload() {
    buyDownloadPhoto(photoData.id, async () => {
      try {
        const zip = new JSZip();
        for (let i = 0; i < photos_list.length; i++) {
          let extension = photos_list[i][1].split(".");
          extension = extension[extension.length - 1];
          set_photos_pages(i);
          if (document.getElementsByClassName("container_card")[i]) {
            window.scroll(
              0,
              document.getElementsByClassName("container_card")[i].offsetTop
            );
          }
          zip.file(
            i + 1 + "." + extension,
            await axiosRequest.getArraybuffer(photos_list[i][1])
          );
        }

        zip.generateAsync({ type: "blob" }).then(function (content) {
          saveAs(content, photoData.title + ".zip");
        });
      } catch (e) {
        callToast("请通知管理人员");
      }
    });
  }

  function toggleOptionNav() {
    setShowOptionNav(!showOptionNav);
  }

  return (
    <HomePhotosContentElement
      view_type={view_type}
      onMouseDown={sliderStart}
      onTouchStart={sliderStart}
      onClick={toggleOptionNav}
    >
      <CSSTransition
        timeout={200}
        in={showOptionNav}
        classNames="CSSTransition_opacity"
        unmountOnExit
        key="CSSTransition_top_nav"
      >
        <TopBarContainer>
          <TopTitleBar
            title={photoData.title}
            showBack={true}
            back_color={"#000a"}
            show_back_color={"#ffffff"}
            iconCallback={clickCollectEven}
            iconState={photoData.is_collect}
          />
        </TopBarContainer>
      </CSSTransition>
      <div
        className="container"
        view_type={view_type}
        style={{
          width: view_type
            ? photos_list.length + "00%"
            : isMobile
            ? "100%"
            : "50%",
          height: view_type ? "calc(var(--vh, 1vh) * 100)" : "auto",
          transform: view_type
            ? "translateX(calc( " +
              photos_pages_offset +
              "px + -" +
              (100 / photos_list.length) * photos_pages +
              "%))"
            : "unset",
          transition: photos_pages_offset ? "unset" : ".2s",
        }}
      >
        {photos_list.map((data) => {
          return (
            <div
              className="container_card"
              style={{
                width: view_type ? 100 / photos_list.length + "%" : "100%",
              }}
              key={data[0]}
            >
              <ImageComponent
                className="container_card_img"
                style={
                  view_type
                    ? {
                        paddingBottom: 0,
                        height: "100%",
                      }
                    : {}
                }
                src={data[1]}
                alt={photoData.title}
                border_radius={0}
                toFixSize={true}
                height={30}
                background_color="#000"
              />
            </div>
          );
        })}
      </div>
      <CSSTransition
        timeout={200}
        in={showOptionNav}
        classNames="CSSTransition_opacity"
        unmountOnExit
        key="CSSTransition_bottom_nav"
      >
        <div ref={navRef} className="bottom_nav">
          <div
            className="bottom_nav_download "
            style={
              show_buy_pic
                ? {
                    top: "-90px",
                    height: "89px",
                    opacity: 1,
                  }
                : {}
            }
          >
            <div className="bottom_nav_download_card">
              <div className="bottom_nav_download_card_header">
                <p className="bottom_nav_download_card_header_money m-1">
                  {intl.formatMessage({ id: "BOTTOM.DOWNLOAD.OWN" })}
                  <span className="bottom_nav_download_card_header_money_inset">
                    {parseInt(user.money) || 0}
                  </span>
                  {intl.formatMessage({ id: "GLOBAL.MONEY" })}
                </p>
                <LinkComponent
                  className="bottom_nav_download_card_header_buy"
                  routes={pageUrlConstants.profile.pages.profilePayment}
                >
                  {intl.formatMessage({ id: "GLOBAL.ACTION.CHARGE" })}
                </LinkComponent>
              </div>
              <div className="bottom_nav_download_card_body">
                <div
                  className="bottom_nav_download_card_body_btn"
                  onClick={clickPayDownload}
                >
                  {intl.formatMessage({ id: "GLOBAL.ACTION.ALWAYS_SAVE" })}
                  <span className="bottom_nav_download_card_body_btn_text">
                    5
                  </span>
                  {intl.formatMessage({ id: "GLOBAL.MONEY" })}
                </div>
              </div>
            </div>
          </div>
          <div
            className="bottom_nav_pages"
            style={
              show_setphotos_pages
                ? {
                    top: "-30px",
                    height: "30px",
                    opacity: 1,
                  }
                : {}
            }
          >
            <div className="bottom_nav_pages_range">
              <input
                className="bottom_nav_pages_range_input"
                type="range"
                min="0"
                max={photos_list.length - 1}
                step="1"
                value={photos_pages}
                onChange={pagesRangeChange}
              />
            </div>
            <div className="bottom_nav_pages_show">
              <p className="bottom_nav_pages_show_text">
                {photos_pages + 1}/{photos_list.length}
              </p>
            </div>
          </div>
          <div
            className="bottom_nav_item"
            onClick={(e) => {
              set_show_setphotos_pages(!show_setphotos_pages);
              set_show_buy_pic(false);
              e.stopPropagation();
            }}
          >
            <WavaButton
              className="bottom_nav_item_box"
              currentRefs={[navRef]}
              type={1}
            >
              <div className="bottom_nav_item_box_icon">
                <img
                  className="bottom_nav_item_box_icon_img"
                  src={bookIcon}
                  alt="pages"
                />
              </div>
              <div className="bottom_nav_item_box_text">
                {intl.formatMessage({ id: "GLOBAL.PAGE_AMOUNT" })}
              </div>
            </WavaButton>
          </div>
          <div
            className="bottom_nav_item"
            onClick={() => {
              view_type = !view_type;
              setView_type(view_type);

              setTimeout(() => {
                scrollToImage();
              }, 500);
            }}
          >
            <WavaButton
              className="bottom_nav_item_box"
              currentRefs={[navRef]}
              type={1}
            >
              <div className="bottom_nav_item_box_icon">
                <img
                  className="bottom_nav_item_box_icon_img"
                  src={view_type ? bookOpenIcon : scrollIcon}
                  alt="type"
                />
              </div>
              <div className="bottom_nav_item_box_text">
                {view_type
                  ? intl.formatMessage({ id: "GLOBAL.ACTION.TURN.PAGES" })
                  : intl.formatMessage({ id: "GLOBAL.ACTION.TURN.SCROLL" })}
              </div>
            </WavaButton>
          </div>
          <div className="bottom_nav_item" onClick={clickCollectEven}>
            <WavaButton
              className="bottom_nav_item_box"
              currentRefs={[navRef]}
              type={1}
            >
              <div className="bottom_nav_item_box_icon">
                <img
                  className="bottom_nav_item_box_icon_img"
                  src={photoData.is_collect ? starFillIcon : starIcon}
                  alt="collect"
                />
              </div>
              <div className="bottom_nav_item_box_text">
                {intl.formatMessage({ id: "GLOBAL.ACTION.COLLECT" })}
              </div>
            </WavaButton>
          </div>
          <div
            className="bottom_nav_item"
            onClick={() => {
              set_show_buy_pic(!show_buy_pic);
              set_show_setphotos_pages(false);
            }}
          >
            <WavaButton
              className="bottom_nav_item_box"
              currentRefs={[navRef]}
              type={1}
            >
              <div className="bottom_nav_item_box_icon">
                <img
                  className="bottom_nav_item_box_icon_img"
                  src={downloadIcon}
                  alt="download"
                />
              </div>
              <div className="bottom_nav_item_box_text">
                {intl.formatMessage({ id: "GLOBAL.ACTION.DOWNLOAD" })}
              </div>
            </WavaButton>
          </div>
        </div>
      </CSSTransition>
    </HomePhotosContentElement>
  );
};

export default HomePhotosContent;

export const HomePhotosContentElement = styled.div`
  /*  */
  display: ${({ view_type }) => (view_type ? "block" : "flex")};
  justify-content: center;

  input[type="range"] {
    height: 5px;
    background-color: transparent;
    border: 1px solid #fff;
    border-radius: 10px;
    outline: none; /* 避免點選會有藍線或虛線 */
    appearance: none;
  }

  input[type="range"]::-webkit-slider-thumb {
    cursor: pointer;
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 50%;
    appearance: none;
    transition: 0.2s;
  }

  input[type="range"]::-moz-range-thumb {
    cursor: pointer;
    width: 16px;
    height: 16px;
    background: #fff;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
  }

  .bottom_nav {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    margin: auto;
    background-color: #000a;
    height: 80px;

    &_pages,
    &_download {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      overflow: hidden;
      padding: 0 ${padding}px;
      height: 0;
      background-color: #000a;
      opacity: 0%;
      transition: 0.2s;
    }

    &_pages {
      user-select: none;
      display: flex;
      align-items: center;

      &_range {
        flex-grow: 1;

        &_input {
          width: 100%;
        }
      }

      &_show {
        width: 70px;
        text-align: right;

        &_text {
          color: #fff;
        }
      }
    }

    &_download {
      &_card {
        &_header {
          display: flex;
          justify-content: space-between;
          margin-top: 5px;
          font-size: 14px;
          color: #fff;

          &_money {
            font-size: 16px;
            &_inset {
              padding: 0 5px;
              color: ${colors.dark_pink};
            }
          }

          &_buy {
            cursor: pointer;
            text-decoration: none;
            color: #fff;
          }
        }

        &_body {
          margin-top: 5px;

          &_btn {
            cursor: pointer;
            user-select: none;
            padding: 10px 0;
            margin: auto;
            width: 100%;
            height: 100%;
            font-size: 20px;
            text-align: center;
            color: ${colors.dark_pink};
            background-color: #fff;
            border-radius: 30px;
          }
        }
      }
    }

    &_item {
      cursor: pointer;
      user-select: none;
      flex-grow: 1;

      &_box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;

        &_icon {
          width: 35px;
          height: 35px;

          &_img {
            width: 100%;
            height: 100%;
            vertical-align: middle;
          }
        }

        &_text {
          font-size: 14px;
          color: #fff;
        }
      }
    }
  }
`;
