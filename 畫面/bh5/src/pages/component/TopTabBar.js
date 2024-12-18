import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
} from "react";
import { useIntl } from "react-intl";
import { styled } from "@mui/material/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import styles from "@emotion/styled/macro";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { main_height, sub_height } from "./TopBarContainer";
import PropTypes from "prop-types";
import { colors, pageUrlConstants, vendorUrl } from "../../constants";
import streamIcon from "../../assets/topbar/stream.svg";
import gameIcon from "../../assets/topbar/game.svg";
import shopIcon from "../../assets/topbar/shop.svg";
import foldArrowIcon from "../../assets/topbar/fold_arrow.svg";

import { getVendorGameListAction } from "../vendorMain/VendorMainAction";
import ImageComponent from "./ImageComponent";
import LinkComponent from "./LinkComponent";
import useMediaSetting from "../../reackHook/useMediaSetting";

const GameProps = createContext("");
const GamePropsProvider = GameProps.Provider;
const { vendor, home } = pageUrlConstants;
const areEqual = (pre, next) => {
  return JSON.stringify(pre) === JSON.stringify(next);
};

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))(({ theme }) => ({
  "& .MuiTabs-indicator": {
    backgroundColor: colors.back_dark_pink,
    [theme.breakpoints.up("sm")]: {
      height: "2px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "2px",
    },
  },
  "& .MuiTabs-indicatorSpan": {
    width: "100%",
    backgroundColor: colors.back_dark_pink,
  },
  "& .MuiTabs-fixed": {
    maxHeight: sub_height,
  },
  "& .MuiTabs-scroller": {
    width: "auto",
    flex: "none",
  },
}));

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    padding: "12px 8px",
    fontSize: 16 + "px",
    alignSelf: "center",
    color: "rgba(0, 0, 0, 0.85)",
    transition: "0.3s",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      fontSize: 14 + "px",
    },
    "&:hover": {
      color: colors.text_grey,
      opacity: 1,
    },
    "&.Mui-selected": {
      color: colors.back_dark_pink,
      fontWeight: theme.typography.fontWeightMedium,
    },
  })
);

const TopTabBar = ({
  labelList,
  callback,
  disabledIndent = false,
  type = 1, // 0 main tab 1 sub tab
  getVendorGameList,
  gameListData,
  indexColumn = false,
}) => {
  const { isMobile } = useMediaSetting();
  const intl = useIntl();
  const location = useLocation();
  const [labelListKey] = useState(Object.keys(labelList));
  const [nowKey, setNowKey] = useState();
  const [drawer, setDrawer] = useState(false);
  const [gameFloatStatus, setGameFloatStatus] = useState(false);
  const handleChange = (_, newValue) => {
    setNowKey(newValue);
  };
  const linkItems = [
    {
      name: intl.formatMessage({ id: "TOP.NAVIGATOR.STREAM" }),
      url: "",
      icon: streamIcon,
      color: "#ff0000",
      onClickEvent: () => callback("streams"),
    },
    {
      name: intl.formatMessage({ id: "GAME.LABEL.GAME" }),
      url: "",
      icon: gameIcon,
      color: "#ffbd2b",
      onMouseEnterEvent: () => setGameFloatStatus((pre) => !pre),
    },
    {
      name: intl.formatMessage({ id: "TOP.NAVIGATOR.SHOP" }),
      url: "",
      icon: shopIcon,
      color: "#ff5610",
      onClickEvent: () => window.open(vendorUrl),
    },
  ];
  useEffect(() => {
    if (!gameListData.length) getVendorGameList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    var url = location.pathname;
    var lastIndex = url.lastIndexOf("/");
    var lastParam = url.substring(lastIndex + 1);
    switch (lastParam) {
      case intl.formatMessage({ id: "TOP.NAVIGATOR.KCOMICS" }):
        setNowKey("k-comics");
        break;
      case intl.formatMessage({ id: "TOP.NAVIGATOR.DOUJIN" }):
        setNowKey("doujin");
        break;
      case intl.formatMessage({ id: "TOP.NAVIGATOR.3D" }):
        setNowKey("3D");
        break;
      case intl.formatMessage({ id: "TOP.NAVIGATOR.FREE_WATCH" }):
        setNowKey("free");
        break;
      default:
        for (let i = 0; i < labelListKey.length; i++) {
          if (lastParam.indexOf(labelListKey[i]) !== -1) {
            setNowKey(labelListKey[i]);
            return;
          } else {
            setNowKey();
          }
        }
        // setNowKey(labelListKey[0]);
        break;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  function onClickTab(labelKey) {
    if (indexColumn) {
      const temp = labelList[labelKey];
      switch (labelKey) {
        //韓漫、同人、3D、free 再種類裡面所以特別處理
        case "k-comics":
        case "doujin":
        case "3D":
        case "free":
          callback("category", temp.name);
          break;
        case "comic":
          callback("category", temp.name);
          break;
        case "animes":
          callback("category", temp.name);
          break;
        default:
          callback(labelKey);
          break;
      }
    } else {
      callback(labelKey);
    }
  }
  return (
    <>
      {isMobile ? (
        <H5TopTabBarElement drawer={drawer} type={type}>
          <div
            className={`${!disabledIndent && "px-indent"}  top_bar_container`}
          >
            <div className="top_bar_url">
              {labelListKey.map((labelKey, index) => {
                return (
                  <div
                    key={labelKey}
                    className="top_bar_url_item"
                    style={{
                      color:
                        nowKey === labelKey
                          ? colors.back_dark_pink
                          : colors.text_grey,
                    }}
                    onClick={() => {
                      onClickTab(labelKey);
                    }}
                  >
                    {labelList[labelKey].name}
                  </div>
                );
              })}
            </div>
            <div className="top_bar_control">
              {!drawer && (
                <img
                  src={foldArrowIcon}
                  className={`${!disabledIndent && "px-indent"} top_bar_arrow ${
                    drawer && "disabled"
                  } `}
                  onClick={() => setDrawer((pre) => !pre)}
                  alt="arrow"
                />
              )}
            </div>
          </div>
          {drawer && (
            <div
              className={`${!disabledIndent && "px-indent"} top_bar_control ${
                !drawer && "disabled"
              }`}
            >
              <img
                src={foldArrowIcon}
                className={`top_bar_arrow reverse`}
                onClick={() => setDrawer((pre) => !pre)}
                alt="arrow"
              />
            </div>
          )}
        </H5TopTabBarElement>
      ) : (
        <TopTabBarElement
          type={type}
          className={`${!disabledIndent && "px-indent"} `}
        >
          <StyledTabs value={nowKey} onChange={handleChange}>
            {labelListKey.map((labelKey) => {
              return (
                <AntTab
                  length={labelListKey.length}
                  value={labelKey}
                  label={labelList[labelKey].name}
                  key={labelKey}
                  onClick={() => {
                    onClickTab(labelKey);
                  }}
                />
              );
            })}
          </StyledTabs>
          <div className="g-center gap-3">
            {linkItems.map((data, index) => {
              const { onMouseEnterEvent, onClickEvent, color, icon, name } =
                data;
              return (
                <div
                  key={index}
                  className={`g-center gap-1 ${index !== 1 && "cursor"}`}
                  onMouseEnter={onMouseEnterEvent && onMouseEnterEvent}
                  onMouseLeave={onMouseEnterEvent && onMouseEnterEvent}
                  onClick={onClickEvent && onClickEvent}
                  style={{ color: color }}
                >
                  <img src={icon} alt={name} />
                  {name}
                  {gameFloatStatus && index === 1 && (
                    <div className="float">
                      <span>
                        {intl.formatMessage({ id: "GAME.LABEL.FEATURED_GAME" })}
                      </span>
                      {gameListData.map((gameItem) => {
                        const { picurl, title, total_like, id } = gameItem;
                        return (
                          <GamePropsProvider
                            key={id}
                            value={{ picurl, title, total_like, id }}
                          >
                            <FeatureGameItem />
                          </GamePropsProvider>
                        );
                      })}
                      {gameListData.length ? (
                        <LinkComponent
                          className="float_button mt-1"
                          routes={{
                            name: home.pages.homeGame.name,
                            path: home.pages.homeGame.path,
                            dynamic: {
                              category: 1,
                            },
                          }}
                        >
                          {intl.formatMessage({ id: "GAME.LABEL.VIEW_MORE" })}
                        </LinkComponent>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </TopTabBarElement>
      )}
    </>
  );
};

const FeatureGameItem = () => {
  const intl = useIntl();
  const { picurl, title, total_like, id } = useContext(GameProps);
  return (
    <FeatureGameItemElement>
      <div className="feature_game_item_img">
        <ImageComponent
          src={picurl}
          alt={title}
          title={title}
          height={100}
          is_cover={true}
        />
      </div>
      <div className="g-flex-column-start " style={{ width: "70%" }}>
        <div className="feature_game_item_title">{title}</div>
        <div className="feature_game_item_subtitle">
          {total_like}
          {intl.formatMessage({ id: "TOP.BAR.PEOPLE_LIKE" })}
        </div>
      </div>
      <LinkComponent
        className="link_container cursor"
        key={title}
        routes={{
          name: vendor.pages.vendorGoods.name + title,
          path: vendor.pages.vendorGoods.path,
          dynamic: {
            goodsId: id,
          },
        }}
      >
        {intl.formatMessage({ id: "TOP.BAR.PLAY" })}
      </LinkComponent>
    </FeatureGameItemElement>
  );
};

const FeatureGameItemElement = styles.div`
  /*  */
  width:100%;
  display:flex;
  justify-content: space-between;
  text-align: start;
  align-items:center;
  gap:1em;
  border-bottom: 1px solid ${colors.text_light_grey};
  padding:10px ;
  &:last-of-type {
    border-bottom: none;
  }
  &:hover{
    background-color:#f3f4f5;
    transition:1s;
  }
  .feature_game_item{
    &_img{
      width:100%;
      max-width:15%;
    }
    &_title{
      width:100%;
      overflow:hidden;
      height:${2.5 * 12}px;
      font-size: 12px;
      word-break: break-all;
    }
    &_subtitle{
      color:${colors.text_grey};
    }
  }
  .link_container{
    flex-shrink: 0;
    text-decoration: none;
    color: ${colors.back_dark_pink};
    height:100%;
    border-radius: 21px;
    padding:5px 15px;
    background-color: rgba(250, 113, 154, 0.2);
  }
  `;

const TopTabBarStateToProps = (state, ownProps) => {
  const gameListData = state.vendorGameListData.vendorList.slice(0, 5);
  return {
    gameListData: gameListData || [],
    labelList: ownProps.labelList,
    callback: ownProps.callback,
    disabledIndent: ownProps.disabledIndent,
    type: ownProps.type, // 0 main tab 1 sub tab
  };
};

const TopTabBarDispatchToProps = (dispatch) => {
  return {
    getVendorGameList: () => {
      dispatch(getVendorGameListAction());
    },
  };
};
TopTabBar.propTypes = {
  labelList: PropTypes.object.isRequired,
  callback: PropTypes.func.isRequired,
  type: PropTypes.number,
};

export default compose(
  connect(
    TopTabBarStateToProps,
    TopTabBarDispatchToProps
  )(React.memo(TopTabBar, areEqual))
);

export const TopTabBarElement = styles.div`
  /*  */
  position:relative;
  display:flex;
  justify-content:space-between;
  align-items:center;
  height: ${({ type }) => (type === 1 ? sub_height : main_height)}px;
  background-color: #fff;
  img{
    width:25px;
    height:25px;
    border-radius:5%;
  }
  .float{
    position:absolute;
    background-color: #fff;
    padding: 15px;
    font-size: 12px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top:34px;
    width: 25em;
    border-radius: 5px;
    box-shadow: 0px 3px 6px 0px RGB(100, 100, 100, 0.36);
    color:black;
    &_button{
      color:#fff;
      border-radius:20px;
      text-decoration: none;
      background:${colors.back_dark_pink};
      padding:5px 15px;
      width: 60%;
    }
  }
`;

export const H5TopTabBarElement = styles.div`
  /*  */
  display:flex;
  background-color: #fff;
  flex-direction: column;
  .top_bar{
    &_container{
      position:relative;
      display:flex;
      justify-content:center;
      align-items:center;
      height: ${({ type, drawer }) =>
        type === 1 ? (drawer ? "auto" : sub_height) : main_height}px;
      min-height:${sub_height}px;
      img{
        width:25px;
        height:25px;
        border-radius:5%;
      }
    }
    &_url{
      flex:0 0 ${({ drawer }) => (drawer ? "90%" : "85%")};
      display: flex;
      flex-wrap: ${({ drawer }) => (drawer ? "wrap" : "nowrap")};
      overflow: hidden;
      gap:${({ drawer }) => (drawer ? "1rem" : "0.5rem")};
      padding: 5px 0;
      font-size: 16px;
      text-align: center;
      align-items:center;
      &_item{
        display: flex;
        justifyContent: center;
        flex: 0 0  ${({ drawer }) => (drawer ? "auto" : "15%")};
        text-wrap: nowrap;
        flex-wrap: nowrap;
      }
    }
    &_control{
    
      text-align: center;
    }
    &_arrow{
      align-self: center;
      width:20px!important;
      height:20px!important;
      &.disabled{
        display:none;
      }
      &.reverse{
        transform: scaleY(-1);
      }
    }
  } 
  .float{
    position:absolute;
    background-color: #fff;
    padding: 15px;
    font-size: 12px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top:34px;
    width: 25em;
    border-radius: 5px;
    box-shadow: 0px 3px 6px 0px RGB(100, 100, 100, 0.36);
    color:black;
    &_button{
      color:#fff;
      border-radius:20px;
      text-decoration: none;
      background:${colors.back_dark_pink};
      padding:5px 15px;
      width: 60%;
    }
  }

`;
