import styled from "@emotion/styled/macro";
import { memo, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { connect } from "react-redux";
import { useLocation } from "react-router";

import { colors } from "../../constants";
import WavaButton from "./WavaButton";

const areEqual = (pre, next) => {
  return JSON.stringify(pre) === JSON.stringify(next);
};

const TopPressBar = ({ labelList, callback }) => {
  const location = useLocation();
  const [labelListKey] = useState(Object.keys(labelList));
  const [nowKey, setNowKey] = useState(labelListKey[0]);
  useEffect(() => {
    for (let i = 0; i < labelListKey.length; i++) {
      if (location.pathname.indexOf(labelListKey[i]) !== -1) {
        setNowKey(labelListKey[i]);
        return;
      }
    }
    setNowKey(labelListKey[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <TopPressBarElement>
      <nav className="search_bar_nav">
        {labelListKey.map((labelKey, index) => (
          <div
            onClick={() => {
              callback(labelKey);
            }}
            key={labelKey}
            className="search_bar_nav_item"
          >
            <WavaButton
              className={
                "search_bar_nav_item_btn " +
                (labelKey === nowKey ? "active" : "")
              }
            >
              {labelList[labelKey].name}
            </WavaButton>
          </div>
        ))}
      </nav>
    </TopPressBarElement>
  );
};

export default memo(TopPressBar, areEqual);

export const TopPressBarElement = styled.div`
  /*  */
  background-color: #fff;
  margin-bottom: 0.1em;
  .search_bar {
    &_nav {
      display: flex;
      justify-content: center;
      &_item {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      div {
        width: 100%;
        text-align: center;
        display: flex;
        place-content: center;
      }
      &_item {
        &_btn {
          padding: 8px;
          margin: 2%;
          &.active {
            cursor: default;
            font-size: 16px;
            color: ${colors.dark_pink};
            text-shadow: 0.09px 0px ${colors.text_grey};
            background-color: #f3f4f5;
            transition: 0.5s;
          }
        }
      }
    }
  }
`;
