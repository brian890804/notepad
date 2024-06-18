import React, { useState, useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import Grid from "@mui/material/Grid";
import { isBrowser } from "react-device-detect";
import styled from "@emotion/styled/macro";
import { useLocation } from "react-router";
import TopBarContainer, { main_height } from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import { colors, side_padding } from "../../constants";
import WavaButton from "../component/WavaButton";
import scrollBottomCallEvent from "../../modules/scrollEvent";

import TabLabel from "./component/TabLabel";
import CoverCubeItem from "../component/CoverCubeItem";

const HomeCategoryPage = ({
  title,
  dataLlist,
  tabList,
  getCategoryList,
  getCategoryData,
  resetSetCategoryData,
  selectCategory
}) => {
  const intl = useIntl();
  const loaction = useLocation();

  const tabRef = useRef(null);

  const [tabHeight, setTabHeight] = useState(0);

  const [tabHeightState, setTabHeightState] = useState(false);

  const [type, setType] = useState(
    title === intl.formatMessage({ id: "GLOBAL.ANIMATE" }) ||
      title === intl.formatMessage({ id: "GLOBAL.3D" })
      ? 0
      : 1
  );
  const [pickCategory, setPickCategory] = useState(selectCategory);
  const [pickPrice, setPickPrice] = useState(
    title === intl.formatMessage({ id: "GLOBAL.FREE_FOR_A_LIMITED_TIME" })
      ? 2
      : 0
  );

  useEffect(() => {
    setType(
      title === intl.formatMessage({ id: "GLOBAL.ANIMATE" }) ||
        title === intl.formatMessage({ id: "GLOBAL.3D" })
        ? 0
        : 1
    );
    setPickPrice(
      title === intl.formatMessage({ id: "GLOBAL.FREE_FOR_A_LIMITED_TIME" })
        ? 2
        : 0
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaction.pathname]);

  // api is_free 1 : 免費 0 : 付費 不傳 全部
  // 辨識方式     2       1         0
  useEffect(() => {
    if (tabList.length === 0) {
      getCategoryList(getTabHeight);
    } else {
      getTabHeight();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getListData();
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, pickCategory, pickPrice, title]);

  function scrollEvent() {
    scrollBottomCallEvent((scrollColdEnd) => {
      getCategoryData(
        {
          type: type,
          category: title,
          is_free: pickPrice,
          tag_gp: pickCategory,
        },
        scrollColdEnd
      );
    });
  }

  function toggleTabHeight() {
    if (tabRef.current.offsetHeight === tabHeight) {
      tabRef.current.style.height = "64px";
      setTabHeightState(false);
    } else {
      tabRef.current.style.height = tabHeight + "px";
      setTabHeightState(true);
    }
  }

  function getTabHeight() {
    tabRef.current.style.height = "unset";
    setTabHeight(tabRef.current.offsetHeight);
    tabRef.current.style.height = "64px";
  }

  function getListData() {
    getCategoryData({
      type: type,
      category: title,
      is_free: pickPrice,
      tag_gp: pickCategory,
    });
  }
  function onSelectCategory(name) {
    if (pickCategory.indexOf(name) !== -1) {
      pickCategory.splice(pickCategory.indexOf(name), 1);
      setPickCategory([...pickCategory]);
    } else {
      setPickCategory([...pickCategory, name]);
    }
  }
  return (
    <HomeCategoryElement className={isBrowser && "px-indent"}>
      {/* <TopBarContainer>
        <TopTitleBar title={title} showBack={true} show_back_color="#ffffff" />
      </TopBarContainer> */}
      <div className="category_container">
        <div className="category_container_content">
          <div className="category_container_content_box">
            <TabLabel
              text={intl.formatMessage({ id: "GLOBAL.COMICS" })}
              active={type === 1}
              onClick={() => {
                if (type !== 1) {
                  resetSetCategoryData(title);
                  setType(1);
                }
              }}
            />
            {"韩漫".indexOf(title) === -1 && (
              <TabLabel
                text={intl.formatMessage({ id: "GLOBAL.ANIMATE" })}
                active={type === 0}
                onClick={() => {
                  if (type !== 0) {
                    resetSetCategoryData(title);
                    setType(0);
                  }
                }}
              />
            )}
          </div>
        </div>
        <div className="category_container_content">
          <div ref={tabRef} className="category_container_content_box">
            <TabLabel
              text={intl.formatMessage({ id: "GLOBAL.ALL" })}
              active={pickCategory.length === 0}
              onClick={() => {
                if (pickCategory.length !== 0) {
                  setPickCategory([]);
                  resetSetCategoryData(title);
                }
              }}
            />
            {tabList.map((tabName, index) => {
              return (
                <TabLabel
                  key={tabName.name + index}
                  text={tabName.name}
                  active={pickCategory.indexOf(tabName.name) !== -1}
                  onClick={() => {
                    resetSetCategoryData(title);
                    onSelectCategory(tabName.name);
                  }}
                />
              );
            })}
          </div>
          <div
            className="category_container_content_btn"
            onClick={toggleTabHeight}
          >
            <WavaButton className="category_container_content_btn_button">
              {tabHeightState
                ? intl.formatMessage({ id: "GLOBAL.SHOW.LESS" })
                : intl.formatMessage({ id: "GLOBAL.SHOW.MORE" })}
            </WavaButton>
          </div>
        </div>
        {title !==
        intl.formatMessage({ id: "GLOBAL.FREE_FOR_A_LIMITED_TIME" }) ? (
          <div className="category_container_content">
            <div className="category_container_content_box">
              <TabLabel
                text={intl.formatMessage({ id: "GLOBAL.ALL" })}
                active={pickPrice === 0}
                onClick={() => {
                  if (pickPrice !== 0) {
                    resetSetCategoryData(title);
                    setPickPrice(0);
                  }
                }}
              />
              <TabLabel
                text={intl.formatMessage({ id: "GLOBAL.FREE" })}
                active={pickPrice === 2}
                onClick={() => {
                  if (pickPrice !== 2) {
                    resetSetCategoryData(title);
                    setPickPrice(2);
                  }
                }}
              />
              <TabLabel
                text={intl.formatMessage({ id: "GLOBAL.PAYMENT" })}
                active={pickPrice === 1}
                onClick={() => {
                  if (pickPrice !== 1) {
                    resetSetCategoryData(title);
                    setPickPrice(1);
                  }
                }}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="category_container_exhibit mt-2">
          <Grid
            container
            direction="row"
            alignItems="center"
            spacing={isBrowser ? 4 : 1}
          >
            {dataLlist.map((data) => {
              //type 0 動畫 1漫畫
              return (
                <Grid
                  item
                  md={type === 0 ? 3 : 2}
                  xs={type === 0 ? 6 : 4}
                  key={data.id}
                >
                  <CoverCubeItem
                    isVideo={type === 0}
                    data={data}
                    type={!type && "animated"}
                    total_view_show
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    </HomeCategoryElement>
  );
};

export default HomeCategoryPage;

export const HomeCategoryElement = styled.div`
  /*  */

  .category_container {
    padding: 10px ${side_padding}px;

    &_content {
      &_box {
        overflow: hidden;
        transition: 0.1s;
      }

      &_btn {
        margin: 4px 0;

        &_button {
          cursor: pointer;
          padding: 10px;
          box-sizing: border-box;
          font-weight: 700;
          text-align: center;
          background-color: ${colors.back_grey};
          border-radius: 5px;
        }
      }
    }

    &_exhibit {
      display: flex;
      flex-wrap: wrap;
      padding-top: 1%;
    }
  }
`;
