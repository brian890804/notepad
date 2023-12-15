import { useEffect } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import ImageCarousel from "../component/ImageCarousel";
import {
  adsKeys,
  colors,
  pageUrlConstants,
  side_padding,
} from "../../constants";
import LinkComponent from "../component/LinkComponent";
import useMediaSetting from "../../reackHook/useMediaSetting";

const { home } = pageUrlConstants;

const HomeSearchMainPage = ({
  hotTabList,
  historyList,
  getSearchTabData,
  clearHistory,
}) => {
  const intl = useIntl();
  const { isMobile } = useMediaSetting();
  useEffect(() => {
    if (hotTabList.length === 0) {
      getSearchTabData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HomeSearchMainPageElement>
      <div className="tab_container">
        <div className="tab_container_header">
          <p className="tab_container_header_title">
            {intl.formatMessage({ id: "SEARCH.HOT_SEARCH" })}
          </p>
        </div>
        <div className="tab_container_body">
          {hotTabList.map((tabName) => {
            return (
              <LinkComponent
                routes={{
                  name:
                    home.pages.homeSearch.pages.homeSearchResult.pages
                      .homeSearchResultSAC.name + tabName,
                  path: home.pages.homeSearch.pages.homeSearchResult.pages
                    .homeSearchResultSAC.path,
                  dynamic: {
                    search: tabName,
                  },
                }}
                className="tab_container_body_tab"
                key={tabName}
              >
                {tabName}
              </LinkComponent>
            );
          })}
        </div>
      </div>
      <ImageCarousel
        adsKey={adsKeys.search_interval}
        threeInOneBanner={!isMobile}
      />
      <div className="tab_container">
        <div className="tab_container_header">
          <p className="tab_container_header_title">
            {intl.formatMessage({ id: "SEARCH.SEARCH_HISTORY" })}
          </p>
          <span className="tab_container_header_clear" onClick={clearHistory}>
            {intl.formatMessage({ id: "GLOBAL.CLEAN" })}
          </span>
        </div>
        <div className="tab_container_body">
          {historyList.map((tabName) => {
            return (
              <LinkComponent
                routes={{
                  name:
                    home.pages.homeSearch.pages.homeSearchResult.pages
                      .homeSearchResultSAC.name + tabName,
                  path: home.pages.homeSearch.pages.homeSearchResult.pages
                    .homeSearchResultSAC.path,
                  dynamic: {
                    search: tabName,
                  },
                }}
                className="tab_container_body_tab"
                key={tabName}
              >
                {tabName}
              </LinkComponent>
            );
          })}
        </div>
      </div>
    </HomeSearchMainPageElement>
  );
};

export default HomeSearchMainPage;

export const HomeSearchMainPageElement = styled.div`/*  */
  padding: 0 ${side_padding}px;

  .tab_container {
    margin: 10px 0;

    &_header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &_title {
        padding-left:5px;
        margin-top:10px;
        font-size: 18px;
        font-weight: 900;
        text-shadow: 0px 0px black;
      }

      &_clear {
        cursor: pointer;
        color: #fa719a;
      }
    }

    &_body {
      margin-top: 10px;

      &_tab {
        cursor: pointer;
        display: inline-block;
        padding: 4px 12px;
        margin: 3px 30px 10px 0;
        padding:auto
        height:25px;
        line-height:25px;
        text-decoration: none;
        color: gray;
        font-weight:600;
        font-size:20px;
        background-color: ${colors.back_grey};
        border-radius:3px;
        
        @media (max-width: 599px) {
          padding: 4px 6px;
          margin: 3px 10px 10px 0;
          font-size:18px;
        }
      }
    }
  }
`;
