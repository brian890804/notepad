import { useEffect, useState, useRef, useCallback, memo } from "react";
import { useIntl } from "react-intl";
import { connect, useDispatch } from "react-redux";

import styled from "@emotion/styled/macro";
import Autolinker from "autolinker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleLeft, faCaretRight, faStar as fillStart } from "@fortawesome/free-solid-svg-icons";
import {
  faClose,
  faAngleLeft,
  faAngleRight,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";

// import { faStar } from "@fortawesome/free-regular-svg-icons";

import ImageComponent from "../../component/ImageComponent";

import vip_icon from "../../../assets/post/vip_icon.png";

import coinNorIcon from "../../../assets/post/coin_nor.svg";
import donateNorIcon from "../../../assets/post/donate_nor.svg";

import msgNorIcon from "../../../assets/post/msg_nor.png";
import msgHoverIcon from "../../../assets/post/msg_hover.png";

import likeNorIcon from "../../../assets/post/like_nor.png";
import likeHoverIcon from "../../../assets/post/like_hover.png";
import likePressIcon from "../../../assets/post/like_press.png";

import viewNorIcon from "../../../assets/post/view_nor.png";
import viewHoverIcon from "../../../assets/post/view_hover.png";

import femaleIcon from "../../../assets/icons/female.svg";
import maleIcon from "../../../assets/icons/male.svg";
import optionIcon from "../../../assets/icons/option.svg";
import { colors, padding, pageUrlConstants } from "../../../constants";

import { A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { main_height } from "../../component/TopBarContainer";
import { CSSTransition } from "react-transition-group";
import { saveAs } from "file-saver";

import {
  postCardLikeEventAction,
  postAttentionEventAction,
  postPayEventAction,
  postScribeEventAction,
  postAddWatchMountEvent,
} from "./PostCardItemAction";
import callToast from "../../../modules/toastCall";
import store from "../../../store";
import { pushRoutes } from "../../../reducers/actions/historyActions";
import {
  dismissPreventPageScroll,
  judeTotalViewUnit,
  navigatorShare,
} from "../../../reducers/actions/utilities";

import { ReactComponent as DownloadCircleIcon } from "../../../assets/icons/download_circle.svg";
import LinkComponent from "../../component/LinkComponent";
import IconEventComponent from "../../component/IconEventComponent";
import useMediaSetting from "../../../reackHook/useMediaSetting";

const { post, login } = pageUrlConstants;

/**
 * @description 用來轉換時間顯示
 *
 * @param { time } time unix時間
 * @return { string } 回傳排好的時間
 */
export const transformTime = function (time) {
  let min = 60;
  let hour = min * 60;
  let day = hour * 24; // 3600 一小時
  let week = day * 7; // 3600 一小時
  let nowTime = Math.floor(Date.now() / 1000);
  let differenceTime = nowTime - time;
  if (differenceTime <= min) {
    return (differenceTime % min) + "秒前";
  } else if (differenceTime <= hour) {
    return Math.ceil((differenceTime % hour) / min) + "分鐘前";
  } else if (differenceTime <= day) {
    return Math.ceil((differenceTime % day) / hour) + "小時前";
  } else if (differenceTime <= week) {
    return Math.ceil((differenceTime % week) / day) + "天前";
  } else {
    let printTime = new Date(time * 1000);
    return (
      printTime.getFullYear() +
      "-" +
      (printTime.getMonth() + 1) +
      "-" +
      printTime.getDate()
    );
  }
};

/**
 * @description 將原本的url 轉換成 打馬的base64圖片
 *
 * @param { string } url 需要添加水印的图片地址
 * @param { string } textAlign 水印位置
 * @param { string } textBaseline 水印位置
 * @param { string,int } content 默认水印内容
 * @return { void } 回傳callback
 */
// const picWaterMark = ({
//   url = "",
//   textAlign = "center",
//   textBaseline = "middle",
//   content = "",
//   callback = null,
// }) => {
//   const img = new Image(); //创建img对象节点
//   img.src = url;
//   //crossOrigin属性设置会产生跨域问题需要在服务器上添加Access-Control-Allow-Origin:*,
//   //后端解决，不设置此属性toDataURL()不能使用
//   img.crossOrigin = "anonymous";
//   img.onload = function () {
//     const canvas = document.createElement("canvas"); //创建canvas节点
//     canvas.width = img.width;
//     canvas.height = img.height;
//     const ctx = canvas.getContext("2d"); //统一设置
//     ctx.drawImage(img, 0, 0, img.width, img.height);

//     const size = 5; //马赛克大小 這個打太大網頁會掛
//     //获取老图所有像素点
//     const oldImg = ctx.getImageData(0, 0, img.width, img.height);
//     //获取新图像素对象
//     const newImg = ctx.createImageData(img.width, img.height);

//     //遍历旧图片获取像素点，并打乱随机将新像素点写入新图片
//     for (var i = 0; i < oldImg.width; i++) {
//       for (var j = 0; j < oldImg.height; j++) {
//         //从5*5中获取单个像素信息
//         var color = getPxInfo(
//           oldImg,
//           Math.floor(i * size + Math.random() * size),
//           Math.floor(j * size + Math.random() * size)
//         );
//         //写入单个像素信息
//         for (var a = 0; a < size; a++) {
//           for (var b = 0; b < size; b++) {
//             setPxInfo(newImg, i * size + a, j * size + b, color);
//           }
//         }
//       }
//     }
//     ctx.putImageData(newImg, 0, 0);

//     //读取单个像素信息
//     function getPxInfo(imgDate, x, y) {
//       var colorArr = [];
//       var width = imgDate.width;
//       colorArr[0] = imgDate.data[(width * y + x) * 4 + 0];
//       colorArr[1] = imgDate.data[(width * y + x) * 4 + 1];
//       colorArr[2] = imgDate.data[(width * y + x) * 4 + 2];
//       colorArr[3] = imgDate.data[(width * y + x) * 4 + 3];
//       return colorArr;
//     }
//     //写入单个像素信息
//     function setPxInfo(imgDate, x, y, colors) {
//       //（x,y） 之前有多少个像素点 == width*y + x
//       var width = imgDate.width;
//       imgDate.data[(width * y + x) * 4 + 0] = colors[0];
//       imgDate.data[(width * y + x) * 4 + 1] = colors[1];
//       imgDate.data[(width * y + x) * 4 + 2] = colors[2];
//       imgDate.data[(width * y + x) * 4 + 3] = colors[3];
//     }

//     //水印样式的设置
//     ctx.textAlign = textAlign;
//     ctx.textBaseline = textBaseline;
//     ctx.fillStyle = "red";
//     ctx.font = "50px sans-serif";
//     ctx.fillText(content, img.width / 2, img.height / 2);
//     //将添加水印和马赛克之后的图片转为base64格式
//     const base64Url = canvas.toDataURL();
//     // 回调函数将base64Url传入;
//     callback && callback(base64Url);
//   };
// };
const areEqual = (pre, next) => {
  return JSON.stringify(pre) === JSON.stringify(next);
};
const PostCardItem = ({
  postData,
  index,
  showFollow = true,
  postCardLikeEvent,
  postCardAttentionEvent,
  postCardDonateEvent,
  postCardBuyMediaEvent,
  postCardPaydownloadMediaEvent,
  toPostCardDetail,
  postCardScribeMediaEvent,
  postAddWatchMountEvent,
}) => {
  const {
    id,
    uid,
    avatar,
    nick_name,
    sex,
    create_time,
    is_top,
    is_like,
    is_attention,
    title,
    lock_status,
    price,
    thumb = [],
    total_like,
    total_comment,
    fake_total_view,
    tag,
    on_subscribe,
    month_price,
    year_price,
    fans_count,
    post_count = 0,
    vip,
  } = postData;
  const intl = useIntl();
  const tagListRef = useRef(null);
  const { isMobile } = useMediaSetting();
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);
  const [showMediaSlider, setShowMediaSlider] = useState(false);
  const [showOptionBox, setShowOptionBox] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const [showView, setShowView] = useState(false);
  const [donateSuccessShow, setDonateSuccessShow] = useState(false);
  const [showScribe, setShowScribe] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState(false);
  const [swiperNumber, setSwiperNumber] = useState(0);
  const [url, setUrl] = useState("");
  const [donateGold, setDonateGold] = useState(null);
  const sliderRef = useRef(null);
  const [moreSettingList, setMoreSettingList] = useState([
    {
      text: "复制分享链接",
      onClick: () => handleCopy(),
    },
    {
      text: "检举",
      onClick: () => onReport(),
    },
    {
      text: is_attention ? "取消关注" : "关注",
      onClick: () => postAttentionEvent(),
    },
    {
      text: "取消",
      onClick: () => {},
    },
  ]);
  useEffect(() => {
    return () => {
      dismissPreventPageScroll();
    };
  }, []);

  function onClickMore() {
    setShowMore((pre) => !pre);
  }
  function onReport() {
    callToast("检举成功(´;ω;`)");
  }
  function handleCopy() {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => callToast("复制成功(´;ω;`)"))
      .catch(() => callToast("复制失败(´;ω;`)"));
  }

  useEffect(() => {
    if (is_attention) {
      const newTemp = moreSettingList;
      newTemp[2].text = "取消关注";
      setMoreSettingList([...moreSettingList]);
    } else {
      const newTemp = moreSettingList;
      newTemp[2].text = "关注";
      setMoreSettingList([...moreSettingList]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [is_attention]);

  useEffect(() => {
    let tabBar = tagListRef.current;
    tabBar.addEventListener("wheel", WheelEvent);
    return () => {
      tabBar.removeEventListener("wheel", WheelEvent);
    };
  }, []);

  function WheelEvent(e) {
    e.preventDefault();
    e.stopPropagation();
    tagListRef.current.scrollLeft += e.deltaY;
  }

  // useEffect(() => {
  //   if (parseInt(lock_status)) {
  //     thumb.forEach((media_value) =>
  //       picWaterMark({
  //         url: media_value,
  //         // content: "付费上车 马上爽", //浮水印內容
  //         callback: (base64Url) => {
  //           setUrl((pre) => [...pre, base64Url]);
  //         },
  //       })
  //     );
  //   }
  //   console.log(lock_status, "uuuu");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [lock_status]);

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.slideTo(swiperNumber, 0, () => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swiperInstance]);

  function media_box_width(length) {
    return ["100%", "50%", "33.3333%", "50%", "33.3333%", "33.3333%"][
      length - 1
    ];
  }

  /**
   * @description 只要內容有連結就轉成超連結
   *
   * @param { string } title 由後端傳來的資料，基本上html資料
   * @return {*} 網址被包超聯結的東西
   */
  const transformLink = function (title) {
    return {
      __html: Autolinker.link(title, {
        className: "post_card_body_content_link",
      }),
    };
  };

  function clickMediaContent() {
    setShowMediaSlider(true);
    // preventPageScroll();
  }

  function closeSlider() {
    setShowMediaSlider(false);
    // dismissPreventPageScroll();
  }

  function postLikeEvent() {
    postCardLikeEvent(postData);
  }

  function postOptionEvent() {
    if (isMobile) {
      setShowOptionBox(true);
    } else {
      onClickMore();
    }
    // preventPageScroll();
  }

  function postAttentionEvent() {
    postCardAttentionEvent(postData);
  }

  function donateGoldEvent() {
    postCardDonateEvent(postData, donateGold, () => {
      setShowDonate(false);
      setDonateSuccessShow(true);
      setTimeout(() => {
        setDonateSuccessShow(false);
        setDonateGold(null);
      }, 3000);
    });
  }

  function buyMediaEvent() {
    const userData = store.getState().user;
    if (userData.id !== "guest") {
      postCardBuyMediaEvent(
        postData,
        postData.price,
        postData.pay_type,
        () => {
          callToast(intl.formatMessage({ id: "TOAST.TIP.BUY_SUCCESS" }));
        },
        0
      );
    } else {
      dispatch(pushRoutes(login));
    }
  }

  async function downloadPostData() {
    try {
      let extension = thumb[swiperNumber].split(".");
      extension = extension[extension.length - 1];
      extension = extension.split("?")[0];
      postCardPaydownloadMediaEvent(
        {
          id,
        },
        () => {
          saveAs(
            thumb[swiperNumber],
            id + "_" + (swiperNumber + 1) + "." + extension
          );
        },
        extension === "mp4"
      );
    } catch (err) {
      console.log(err);
      callToast(intl.formatMessage({ id: "TOAST.TIP.NOTICE_ADMIN" }));
    }
  }
  function onScribe(type) {
    setShowScribe((pre) => !pre);
    if (type) {
      postCardScribeMediaEvent(postData, type);
    }
  }
  function onMediaClick(mediaInd) {
    setSwiperNumber(mediaInd);
    if (parseInt(lock_status) !== 1 && store.getState().user.id !== "guest") {
      clickMediaContent();
      postAddWatchMountEvent(postData);
    } else {
      dispatch(pushRoutes(login));
    }
  }

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <PostCardItemElement swiperNumber={swiperNumber} is_like={is_like == 1}>
      <CSSTransition
        timeout={200}
        in={showDonate}
        classNames="CSSTransition_opacity"
        unmountOnExit
        key="CSSTransition_show_donate"
      >
        <div className="float_cover">
          <div className="float_cover_container">
            <div className="float_cover_container_title">
              <p className="float_cover_container_title_text">
                {intl.formatMessage({
                  id: "POST.THX_SUPPORT",
                })}
              </p>
            </div>
            <div className="float_cover_container_content">
              <input
                className="float_cover_container_content_input"
                type="number"
                step="1"
                placeholder={intl.formatMessage({
                  id: "POST.PLACEHOLDER.DONATE_MONEY",
                })}
                value={donateGold}
                onChange={(e) => {
                  setDonateGold(e.target.value);
                }}
              />
            </div>
            <div className="float_cover_container_btn">
              <div
                className="float_cover_container_btn_button heightlight"
                onClick={() => {
                  donateGoldEvent();
                }}
              >
                <span className="float_cover_container_btn_button_text">
                  {intl.formatMessage({
                    id: "POST.PLACEHOLDER.DONATE_DIAMOND",
                  })}
                </span>
              </div>
              <div
                className="float_cover_container_btn_button"
                onClick={() => {
                  setShowDonate(false);
                }}
              >
                <span className="float_cover_container_btn_button_text">
                  {intl.formatMessage({ id: "POST.PLACEHOLDER.THINK_AGAIN" })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
      <CSSTransition
        timeout={200}
        in={showView}
        classNames="CSSTransition_opacity"
        unmountOnExit
        key="CSSTransition_show_view"
      >
        <div className="float_cover" onClick={() => setShowView(false)}>
          <div
            className="float_cover_container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="float_cover_container_title">
              <p className="float_cover_container_title_text">
                {intl.formatMessage({
                  id: "POST.WATCH",
                })}
              </p>
            </div>
            <div className="float_cover_container_content">
              {intl.formatMessage({
                id: "POST.WATCH_FREQUENCY",
              })}
            </div>
            <div className="float_cover_container_btn">
              <div
                className="float_cover_container_btn_button heightlight"
                onClick={() => {
                  setShowView(false);
                }}
              >
                <span className="float_cover_container_btn_button_text">
                  {intl.formatMessage({
                    id: "POST.KNOW",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
      <CSSTransition
        timeout={200}
        in={showOptionBox && isMobile}
        classNames="CSSTransition_opacity"
        unmountOnExit
        key="CSSTransition_show_option"
      >
        <div className="option_cover">
          <div className="option_cover_container">
            <div
              className="option_cover_container_item"
              onClick={() => {
                setShowOptionBox(false);
                navigatorShare({
                  url: `${window.location.origin}/posts/main/dynamic/${id}`,
                });
              }}
            >
              <span className="option_cover_container_item_text">
                {intl.formatMessage({ id: "GLOBAL.ACTION.SHARE" })}
              </span>
            </div>
            <div
              className="option_cover_container_item"
              onClick={() => {
                callToast(intl.formatMessage({ id: "TOAST.TIP.REPORTED" }));
                setShowOptionBox(false);
              }}
            >
              <span className="option_cover_container_item_text">
                {intl.formatMessage({ id: "TOAST.TIP.REPORT" })}
              </span>
            </div>
            <div
              className="option_cover_container_item"
              onClick={() => {
                postAttentionEvent();
                setShowOptionBox(false);
                dismissPreventPageScroll();
              }}
            >
              <span className="option_cover_container_item_text">
                {(is_attention === 1
                  ? intl.formatMessage({ id: "POST.ALREADY" })
                  : "") + intl.formatMessage({ id: "POST.FOCUS" })}
              </span>
            </div>
            <div
              className="option_cover_container_item"
              onClick={() => {
                setShowOptionBox(false);
                dismissPreventPageScroll();
              }}
            >
              <span className="option_cover_container_item_text cancel">
                {intl.formatMessage({ id: "GLOBAL.ACTION.CANCEL" })}
              </span>
            </div>
          </div>
        </div>
      </CSSTransition>
      <CSSTransition
        timeout={200}
        in={showMediaSlider}
        classNames="CSSTransition_opacity"
        unmountOnExit
        key="CSSTransition_show_media"
      >
        <div className="media_slider">
          <div className="media_slider_header">
            <div className="media_slider_header_back" onClick={closeSlider}>
              <FontAwesomeIcon
                className="media_slider_header_back_icon"
                icon={faClose}
              />
            </div>
            <div className="media_slider_header_title">
              {swiperNumber + 1} / {thumb.length}
            </div>
            {/* <div 
              className="media_slider_header_like"
              onClick={postLikeEvent}
            >
              <FontAwesomeIcon 
                className={"media_slider_header_like_icon " + (is_like === "0" ? "" : "light")} 
                icon={is_like === "0" ? faStar : fillStart} 
              />
            </div> */}
          </div>

          <Swiper
            ref={sliderRef}
            className="media_slider_container"
            modules={[A11y]}
            spaceBetween={50}
            slidesPerView={1}
            onSwiper={(swiper) => setSwiperInstance(swiper)}
            onSlideChange={(e) => {
              setSwiperNumber(e.realIndex);
            }}
          >
            {thumb.map((media_value, mediaInd) => {
              return (
                <SwiperSlide
                  className="media_slider_container_box"
                  key={media_value}
                >
                  {media_value.indexOf("/video/") !== -1 ? (
                    <>
                      <video
                        className="media_slider_container_box_img"
                        preload="metadata"
                        controls
                        controlsList="nodownload"
                        playsInline
                        onTouchEnd={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                        onContextMenu={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                      >
                        <source src={media_value + "#t=0.1"} />
                      </video>
                    </>
                  ) : (
                    <img
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                      className="media_slider_container_box_img"
                      src={media_value}
                      // src={url.length>0 ? url[mediaInd] : media_value}
                      alt={"media" + nick_name + mediaInd}
                      onTouchEnd={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                      onContextMenu={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                    />
                  )}
                </SwiperSlide>
              );
            })}
            <FontAwesomeIcon
              className="media_slider_pagination_prev"
              icon={faAngleLeft}
              onClick={handlePrev}
              style={{
                display:
                  (thumb.length === 1 || swiperNumber + 1 === 1) && "none",
              }}
            />
            <FontAwesomeIcon
              className="media_slider_pagination_next"
              icon={faAngleRight}
              onClick={handleNext}
              style={{
                display:
                  (thumb.length === 1 || swiperNumber + 1 === thumb.length) &&
                  "none",
              }}
            />
          </Swiper>
          <div className="media_slider_footer">
            <div className="media_slider_footer_container">
              <div
                className="media_slider_footer_container_btn"
                onClick={downloadPostData}
              >
                <DownloadCircleIcon className="media_slider_footer_container_btn_icon" />
                <span className="media_slider_footer_container_btn_text">
                  {intl.formatMessage({ id: "GLOBAL.ACTION.ALWAYS_SAVE" })}
                  {thumb[swiperNumber]?.indexOf("mp4") === -1 ? 1 : 3}{" "}
                  {intl.formatMessage({ id: "GLOBAL.MONEY" })}
                </span>
              </div>
              <div className="media_slider_footer_container_recharge">
                <LinkComponent
                  className="media_slider_footer_container_recharge_btn"
                  routes={pageUrlConstants.profile.pages.profilePayment}
                >
                  <span className="media_slider_footer_container_recharge_btn_text">
                    {intl.formatMessage({ id: "GLOBAL.ACTION.CHARGES" })}
                  </span>
                  <FontAwesomeIcon
                    className="media_slider_footer_container_recharge_btn_icon"
                    icon={faAngleRight}
                  />
                </LinkComponent>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
      <CSSTransition
        timeout={200}
        in={showScribe}
        classNames="CSSTransition_scribe"
        unmountOnExit
        key="CSSTransition_show_scribe"
      >
        <div className="subscribe_cover" onClick={() => setShowScribe(false)}>
          <div
            className="subscribe_cover_container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="subscribe_cover_container_title">订阅解锁</div>
            <div className="subscribe_cover_container_content">
              {nick_name} <br />
              {post_count}贴文・{fans_count}粉丝数
            </div>
            <div className="subscribe_cover_container_content">
              订阅可以查看创作者所有「私密贴文」，更加亲近你喜爱的创作者
            </div>
            <div
              className="subscribe_cover_container_btn"
              onClick={() => onScribe(1)}
            >
              <div>訂閱</div>
              <div>{month_price}精钻/月</div>
            </div>
            <div
              className="subscribe_cover_container_btn"
              onClick={() => onScribe(2)}
            >
              <div>訂閱</div>
              <div>{year_price}精钻/年</div>
            </div>
          </div>
        </div>
      </CSSTransition>
      <div className="post_card">
        <div className="post_card_header">
          <div className="post_card_header_info">
            <div className="post_card_header_info_pic">
              <LinkComponent
                routes={{
                  name: pageUrlConstants.post.pages.postMain.pages.postProfile
                    .name,
                  path: pageUrlConstants.post.pages.postMain.pages.postProfile
                    .path,
                  dynamic: {
                    profileId: uid,
                  },
                }}
              >
                <ImageComponent
                  is_cover={true}
                  src={avatar}
                  alt={nick_name}
                  title={nick_name}
                />
              </LinkComponent>
            </div>
            <div className="post_card_header_info_detail">
              <div className="post_card_header_info_detail_name">
                {nick_name}
              </div>
              <div className="post_card_header_info_detail_description">
                <img
                  className="post_card_header_info_detail_description_sex"
                  src={sex === 1 ? femaleIcon : maleIcon}
                  alt="sexicon"
                />
                <span className="post_card_header_info_detail_description_time">
                  {index === -1 ? "" : transformTime(create_time)}
                </span>
              </div>
            </div>
          </div>

          {showFollow && (
            <div className="post_card_header_follow">
              {vip === 1 ? (
                <img
                  src={vip_icon}
                  title="VIP图标"
                  alt="VIP图标"
                  className="post_card_header_follow_icon"
                />
              ) : (
                ""
              )}
              <div
                className="post_card_header_follow_button"
                style={{
                  color:
                    is_top === 1 || is_attention === 1 ? "#fff" : "#fa719a",
                  backgroundColor:
                    is_top === 1 || is_attention === 1 ? "#fa719a" : "#fff",
                }}
                onClick={() => {
                  if (is_top !== 1) {
                    postAttentionEvent();
                  }
                }}
              >
                {is_top === 1
                  ? intl.formatMessage({ id: "POST.TO_TOP" })
                  : (is_attention === 1
                      ? intl.formatMessage({ id: "POST.ALREADY" })
                      : "") + intl.formatMessage({ id: "POST.FOCUS" })}
              </div>
            </div>
          )}
        </div>
        <div className="post_card_body">
          <div
            className="post_card_body_content"
            dangerouslySetInnerHTML={transformLink(title)}
          ></div>
          <div className="post_card_body_media">
            {parseInt(lock_status) === 1 ? (
              <div className="post_card_body_media_cover">
                {
                  // 訂閱解鎖
                  on_subscribe === 1 && (
                    <div
                      className="post_card_body_media_cover_container_subscribe"
                      onClick={() => onScribe()}
                    >
                      <span className="post_card_body_media_cover_container_text">
                        点我訂閱(ゝ∀･)b
                      </span>
                    </div>
                  )
                }
                {
                  // 金幣+訂閱解鎖都有的話
                  on_subscribe === 1 && price > 0 && (
                    <span className="unblock">－或以金币解锁单则贴文－</span>
                  )
                }
                {price > 0 && ( // 金幣解鎖
                  <div
                    className="post_card_body_media_cover_container"
                    onClick={() => {
                      if (parseInt(lock_status) !== 1) {
                        clickMediaContent();
                      } else {
                        buyMediaEvent();
                      }
                    }}
                  >
                    <img
                      className="post_card_body_media_cover_container_icon"
                      src={postData.pay_type ? donateNorIcon : coinNorIcon}
                      alt="iconCoin"
                    />
                    <span className="post_card_body_media_cover_container_text">
                      {price} ｜{" "}
                      {intl.formatMessage({ id: "POST.UNLOCK_WATCH" })}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
            <div
              className={`post_card_body_media_donate_cover ${
                donateSuccessShow && " open"
              }`}
              style={{ position: thumb.length ? "absolute" : "fixed" }}
              onClick={() => setDonateSuccessShow(false)}
            >
              <div className="post_card_body_media_donate_cover_container">
                打赏 {donateGold} 精钻，感谢你的爱~
              </div>
            </div>
            {thumb.map((media_value, mediaInd) => {
              return (
                <div
                  className={
                    "post_card_body_media_box " +
                    (media_value.indexOf("/video/") !== -1 ? "" : "img")
                  }
                  style={{
                    width: media_box_width(thumb.length),
                    paddingBottom: media_box_width(thumb.length),
                    cursor: parseInt(lock_status) === 1 ? "default" : "pointer",
                  }}
                  onClick={() => onMediaClick(mediaInd)}
                  key={"mediaindex_" + mediaInd}
                >
                  {media_value.indexOf("/video/") !== -1 ? (
                    <>
                      <video
                        key={"post_media_" + mediaInd}
                        className="post_card_body_media_box_item"
                        preload="metadata"
                        style={{
                          filter:
                            parseInt(lock_status) === 1 ? "blur(5px)" : "",
                        }}
                      >
                        <source src={media_value + "#t=0.1"} />
                      </video>
                      <div className="post_card_body_media_box_item_play">
                        <div className="post_card_body_media_box_item_play_btn">
                          <FontAwesomeIcon icon={faCaretRight} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="img_container">
                      <img
                        className="img"
                        key={"post_media_" + mediaInd}
                        src={
                          // parseInt(lock_status) ? url[mediaInd] : media_value
                          media_value
                        }
                        alt={"media" + nick_name + mediaInd}
                        border_radius={0}
                        style={{
                          filter:
                            parseInt(lock_status) === 1 ? "blur(10px)" : "",
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="post_card_body_tag" ref={tagListRef}>
            {tag?.map((item) => (
              <LinkComponent
                routes={{
                  name:
                    pageUrlConstants.post.pages.postMain.pages.postSameTagList
                      .name + item.name,
                  path: pageUrlConstants.post.pages.postMain.pages
                    .postSameTagList.path,
                  dynamic: {
                    tagId: item.id,
                  },
                }}
                className="post_card_body_tag_item"
                key={item.id}
              >
                {item.name}
              </LinkComponent>
            ))}
          </div>
        </div>
        {index === -1 ? (
          <div className="post_card_time">{transformTime(create_time)}</div>
        ) : (
          ""
        )}
        <div
          className="post_card_footer"
          style={{
            marginTop: index === -1 ? "5px" : "",
          }}
        >
          <IconEventComponent
            nor={msgNorIcon}
            hover={msgHoverIcon}
            className="post_card_footer_item post_card_footer_comment"
            imgClassName="post_card_footer_item_icon"
            onClick={() => {
              toPostCardDetail(postData.id);
              postAddWatchMountEvent(postData);
            }}
          >
            <span className="post_card_footer_item_text">
              {total_comment <= 0
                ? intl.formatMessage({ id: "POST.COMMENTS" })
                : total_comment}
            </span>
          </IconEventComponent>
          <IconEventComponent
            className="post_card_footer_item post_card_footer_like"
            imgClassName="post_card_footer_item_icon"
            onClick={postLikeEvent}
            pressed={is_like === 1}
            nor={likeNorIcon}
            hover={likeHoverIcon}
            press={likePressIcon}
          >
            <span className="post_card_footer_item_text like">
              {total_like}
            </span>
          </IconEventComponent>
          <IconEventComponent
            className="post_card_footer_item post_card_footer_coin"
            onClick={() => {
              setShowDonate(true);
            }}
          >
            <img
              className="post_card_footer_item_icon"
              src={donateNorIcon}
              alt="iconCoin"
            />
            <span className="post_card_footer_item_text coin">
              {intl.formatMessage({ id: "POST.PLACEHOLDER.DONATE" })}
            </span>
          </IconEventComponent>
          <IconEventComponent
            nor={viewNorIcon}
            hover={viewHoverIcon}
            className="post_card_footer_item post_card_footer_view"
            imgClassName="post_card_footer_item_icon"
            onClick={() => {
              setShowView(true);
            }}
          >
            <span className="post_card_footer_item_text">
              {fake_total_view
                ? judeTotalViewUnit(fake_total_view)
                : intl.formatMessage({ id: "POST.WATCH" })}
            </span>
          </IconEventComponent>
          <div
            className="post_card_footer_item post_card_footer_option"
            onClick={postOptionEvent}
          >
            <img
              className="post_card_footer_item_icon"
              src={optionIcon}
              alt="iconOption"
            />
            <div className={`more_setting ${showMore && "active"}`}>
              {moreSettingList.map((item, index) => (
                <div
                  key={"setting" + index}
                  className="more_setting_item"
                  onClick={item.onClick}
                >
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PostCardItemElement>
  );
};

const PostCardItemStateToProps = (state, ownProps) => {
  return {
    postData: { ...ownProps.postData },
    index: ownProps.index,
  };
};

const PostCardItemDispatchToProps = (dispatch) => {
  const userId = store.getState().user.id;
  return {
    postCardLikeEvent: (data) => {
      if (store.getState().user.id === "guest") {
        dispatch(pushRoutes(pageUrlConstants.login));
      } else {
        dispatch(postCardLikeEventAction(data));
      }
    },
    postCardAttentionEvent: (data) => {
      if (userId === "guest") {
        dispatch(pushRoutes(login));
      } else {
        dispatch(postAttentionEventAction(data));
      }
    },
    postCardDonateEvent: (data, gold, callback, action = 3, pay_type = 1) => {
      if (userId === "guest") {
        dispatch(pushRoutes(login));
      } else {
        dispatch(postPayEventAction(data, gold, callback, action, pay_type));
      }
    },
    postCardBuyMediaEvent: (data, gold, pay_type = 0, callback, action = 0) => {
      if (userId === "guest") {
        dispatch(pushRoutes(login));
      } else {
        dispatch(postPayEventAction(data, gold, callback, action, pay_type));
      }
    },
    postCardScribeMediaEvent: (data, type) => {
      if (userId === "guest") {
        dispatch(pushRoutes(login));
      } else {
        dispatch(postScribeEventAction(data, type));
      }
    },
    postCardPaydownloadMediaEvent: (data, callback, isVideo) => {
      if (userId === "guest") {
        dispatch(pushRoutes(login));
      } else {
        dispatch(
          // postPayEventAction(data, isVideo ? 3 : 1, callback, isVideo ? 2 : 1)
          postPayEventAction(data, isVideo ? 3 : 1, callback, 0)
        );
      }
    },
    toPostCardDetail: (dynamicId) => {
      // if (userId === "guest") {
      // dispatch(pushRoutes(login));
      // } else {
      dispatch(
        pushRoutes({
          name: post.pages.postMain.pages.postCard.name + dynamicId,
          path: post.pages.postMain.pages.postCard.path,
          dynamic: {
            dynamicId: dynamicId,
          },
        })
      );
      // }
    },
    postAddWatchMountEvent: (data) => {
      if (userId === "guest") {
        dispatch(pushRoutes(login));
      } else {
        dispatch(postAddWatchMountEvent(data));
      }
    },
  };
};

export default connect(
  PostCardItemStateToProps,
  PostCardItemDispatchToProps
)(memo(PostCardItem, areEqual));

export const PostCardItemElement = styled.div`
  /*  */
  width: 100%;

  .more_setting {
    @media (max-width: 899px) {
      display: none;
    }
  }
  .img {
    user-select: none;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    vertical-align: middle;
    object-fit: cover;
    -webkit-touch-callout: none;

    &_container {
      position: relative;
      overflow: hidden;
      padding-bottom: 100%;
      width: 100%;
      background-color: #f3f4f6;
      border-radius: 5px;
      transition: 0.3s;
    }
  }

  .media_slider,
  .option_cover,
  .subscribe_cover,
  .float_cover {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 11;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    background-color: #000c;
  }

  .float_cover {
    &_subscribe_container,
    &_container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      box-sizing: border-box;
      width: 300px;
      background-color: #fff;
      border-radius: 5px;

      &_title {
        margin-top: 20px;
        font-weight: 600;
        &_text {
          font-size: 18px;
        }
      }

      &_content {
        margin-top: 15px;
        width: 80%;
        text-align: center;
        color: ${colors.text_grey};

        &_input {
          width: 100%;
          text-align: center;
          border: none;
          border-bottom: 1px solid;
          outline: none;
          border-radius: 0;
        }
      }

      &_btn {
        display: flex;
        flex-direction: column;
        margin-top: 15px;
        width: 80%;

        &_button {
          cursor: pointer;
          padding: 10px;
          margin: 5px 0;
          box-sizing: border-box;
          width: 100%;
          font-size: 14px;
          text-align: center;
          border-radius: 20px;

          &_text {
            color: ${colors.text_light_grey};
          }

          &.heightlight {
            background-color: ${colors.back_dark_pink};

            .float_cover_container_btn_button_text {
              color: #fff;
            }
          }
        }
      }
    }
  }
  .subscribe_cover {
    &_container {
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: start;
      background-color: #fff;
      box-sizing: border-box;
      border-radius: 5px;
      width: 300px;
      padding: 20px;
      &_title {
        margin-top: 20px;
        font-weight: 600;
        font-size: 18px;
      }
      &_content {
        margin: 15px 0;
        color: ${colors.text_grey};
      }
      &_btn {
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        padding: 10px;
        margin: 5px 0;
        box-sizing: border-box;
        width: 100%;
        font-size: 14px;
        text-align: center;
        border-radius: 20px;
        background-color: ${colors.back_dark_pink};
        color: #fff;
      }
    }
  }
  .option_cover {
    &_container {
      width: 80%;
      width: 300px;
      text-align: center;
      background-color: #fff;

      &_item {
        cursor: pointer;
        padding: 20px 0;
        font-size: 20px;
        text-align: center;
        border-bottom: 1px solid #ddd;
        font-weight: 600;
        &:hover {
          .option_cover_container_item_text {
            color: ${colors.dark_pink};
            transition: 0.5s;
          }
        }
        &:last-of-type {
          border-bottom: none;
        }

        &_text {
          color: ${colors.text_light_grey};

          &.cancel {
            color: ${colors.text_light_grey};
          }
        }
      }
    }
  }

  .media_slider {
    color: #fff;
    &_header {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      padding-right: ${padding}px;
      padding-left: ${padding}px;
      margin-right: auto;
      box-sizing: border-box;
      width: 100%;
      height: ${main_height}px;

      &_back,
      &_like {
        &_icon {
          cursor: pointer;
          width: 30px;
          height: 30px;
          vertical-align: middle;

          &.light {
            color: ${colors.light_star};
          }
        }
      }

      &_title {
        width: 100%;
        text-align: center;
      }
    }

    &_container {
      position: relative;
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 0%;
      color: #fff;

      &_box {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        width: 100%;
        height: 100%;

        &_img {
          vertical-align: middle;
        }
      }
    }

    &_footer {
      position: relative;
      display: flex;
      justify-content: center;
      padding: 20px 0;
      width: 100%;

      &_container {
        font-size: 12px;

        &_btn,
        &_recharge {
          cursor: pointer;

          &_icon {
            vertical-align: middle;
          }

          &_text {
            vertical-align: middle;
          }
        }

        &_btn {
          padding: 2px 10px;
          border: 1px solid #fff;
          border-radius: 30px;

          &_icon {
            width: 20px;
            height: 20px;
          }

          &_text {
            margin-left: 5px;
          }
        }

        &_recharge {
          position: absolute;
          top: 50%;
          right: 20px;
          transform: translateY(-50%);

          &_btn {
            text-decoration: none;
            color: #fff;

            /* &_text {}
            &_icon {} */
          }
        }
      }
    }

    &_pagination {
      &_prev,
      &_next {
        position: fixed;
        font-size: 40px;
        z-index: 999;
        cursor: pointer;
        @media (max-width: 899px) {
          display: none;
        }
      }
      &_prev {
        left: 10%;
      }
      &_next {
        right: 10%;
      }
    }
  }

  .post_card {
    background-color: #fff;
    @media (min-width: 899px) {
      margin-bottom: 0.5em;
    }
    &_header {
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;

      &_info {
        display: flex;
        align-items: center;

        &_pic {
          overflow: hidden;
          width: 45px;
          border-radius: 50%;
        }

        &_detail {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          margin-left: 10px;
          height: 100%;

          &_name {
            font-size: 16px;
            font-weight: 500;
          }

          &_description {
            display: flex;
            font-size: 14px;
            color: #a8a8a8;

            &_sex {
              width: 14px;
              vertical-align: text-top;
            }

            &_time {
              padding-left: 5px;
            }
          }
        }
      }

      &_follow {
        display: flex;
        align-items: center;
        &_icon {
          height: 35px;
        }
        &_button {
          cursor: pointer;
          padding: 4px 12px;
          font-size: 12px;
          border: 1px solid ${colors.dark_pink};
          border-radius: 16px;
          align-self: center;
        }
      }
    }

    &_body {
      padding: 0 20px;
      margin: auto;

      &_content {
        font-size: 16px;
        line-height: 1.4em;
        white-space: pre-wrap;
        word-break: break-all;

        &_link {
          text-decoration: underline;
          color: #00bde8;
        }
      }

      &_media {
        position: relative;
        display: flex;
        overflow: hidden;
        margin-top: 10px;
        width: 100%;
        flex-wrap: wrap;
        @media (min-width: 599px) {
          border-radius: 10px;
        }
        &_donate_cover,
        &_cover {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 1;
          display: flex;
          gap: 10px;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 10px;

          &_container {
            padding: 6px 12px;
            cursor: pointer;
            color: ${colors.back_dark_pink};
            background: rgba(250, 113, 154, 0.2);
            border: 3px solid;
            border-radius: 20px;
            @media (min-width: 899px) {
              padding: 12px 50px;
              border-radius: 40px;
            }
            &_subscribe {
              cursor: pointer;
              padding: 18px 35px;
              border-radius: 7px;
              color: #fff;
              background: ${colors.back_dark_pink};
              @media (min-width: 899px) {
                padding: 18px 97px;
              }
            }

            &_icon,
            &_text {
              vertical-align: middle;
              @media (min-width: 899px) {
                font-size: 18px;
                font-weight: 600;
              }
            }

            &_icon {
              width: 20px;
              @media (min-width: 899px) {
                width: 30px;
                margin-right: 5px;
              }
            }
          }
        }

        &_donate_cover {
          opacity: 0;
          transition: 1s;
          &.open {
            z-index: 2;
            background-color: transparent;
            opacity: 100;
          }
          &.false {
            display: none;
          }

          &_container {
            padding: 6px 12px;
            border-radius: 5px;
            background: rgba(0, 0, 0, 0.76);
            text-align: center;
            border: 0;
            @media (min-width: 899px) {
              padding: 10px 20px;
              border-radius: 10px;
            }
          }
        }

        &_box {
          position: relative;

          &.img {
            padding-bottom: 0 !important;
          }

          &_item {
            position: absolute;
            top: 0px;
            right: 0px;
            bottom: 0px;
            left: 0px;
            width: calc(100%);
            height: calc(100%);
            vertical-align: middle;
            object-fit: cover;

            &_play {
              position: absolute;
              top: 0px;
              right: 0px;
              bottom: 0px;
              left: 0px;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 100%;
              color: #fff;

              &_btn {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 30px;
                height: 30px;
                font-size: 30px;
                border: 2px solid #fff;
                border-radius: 50%;

                svg {
                  // transform: translateX(3px);
                }
              }
            }
          }
        }
      }
      &_tag {
        display: flex;
        overflow-x: scroll;
        white-space: nowrap;
        gap: 5px;
        padding: 10px 0;
        &_item {
          flex-shrink: 0;
          display: inline-block;
          overflow: hidden;
          text-decoration: none;
          padding: 5px 20px;
          border-radius: 16px;
          white-space: nowrap;
          transition: all 0.5s ease-in-out;
          color: #a8a8a8;
          background: #f3f4f5;
          cursor: pointer;
        }
      }
    }

    &_time {
      margin: 20px auto 0;
      width: 97%;
      font-size: 14px;
      color: #a8a8a8;
    }

    &_footer {
      display: flex;
      justify-content: space-evenly;
      padding: 10px 0;
      border-top: 1px solid #cccc;
      &_like {
        color: ${({ is_like }) =>
          is_like ? colors.dark_pink : colors.text_light_grey}!important;
        &:hover {
          color: ${colors.dark_pink}!important;
        }
      }
      &_comment {
        color: ${colors.text_light_grey}!important;
        &:hover {
          color: #39b3fd !important;
        }
      }

      &_view {
        color: ${colors.text_light_grey}!important;
        &:hover {
          color: #bc79f4 !important;
        }
      }

      &_coin {
        color: ${colors.text_light_grey}!important;
        &:hover {
          color: #fd0 !important;
        }
      }

      &_item {
        cursor: pointer;
        width: 30%;
        text-align: center;

        &_icon {
          margin: 0 5px;
          width: 20px;
          vertical-align: middle;
        }

        &_text {
          vertical-align: middle;
        }
      }
      &_option {
        position: relative;
      }
    }
  }
  .swiper-slide img {
    width: auto !important;
    height: auto !important;
  }
  .unblock {
    color: ${colors.text_grey};
  }
  .more {
    width: 30px;
    &_setting {
      display: none;

      @media (min-width: 899px) {
        &.active {
          z-index: 11;
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 50px;
          right: 0;
          border-radius: 8px;
          box-shadow: 0 3px 6px 0 rgba(100, 100, 100, 0.36);
          background-color: #fff;
          border-radius: 10px;
        }
      }
      &_item {
        white-space: nowrap;
        text-align: center;
        border-bottom-width: 1px;
        border-color: ${colors.text_light_grey};
        border-style: inset;
        color: ${colors.text_light_grey};
        padding: 10px 15px;
        &:hover {
          color: ${colors.dark_pink};
          text-shadow: 0 0 ${colors.dark_pink};
        }
        &:last-child {
          border-bottom-width: 0px;
        }
      }
    }
  }
`;
