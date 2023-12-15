import { useState, useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import TopBarContainer, { main_height } from "../component/TopBarContainer";
import SwitchRoute from "../component/SwitchRoute";

import TopSearchBar from "./component/TopSearchBar";
import TopTabBar from "../component/TopTabBar";

const HomeSearchPage = ({
  searchName,
  searchBarKeyDown,
  routes,
  clickTopBackArrow,
  clickTabLabel,
}) => {
  const intl = useIntl();

  const containerRef = useRef(null);

  const [searchBarValue, setSearchBarValue] = useState("");

  useEffect(() => {
    if (searchName) {
      setSearchBarValue(searchName);
    }
  }, [searchName]);

  function onSearchChange(e) {
    setSearchBarValue(e.target.value);
  }

  let labelList = {
    SAC: {
      name: intl.formatMessage({ id: "TOP.NAVIGATOR.COMIC" }),
    },
    SAV: {
      name: intl.formatMessage({ id: "TOP.NAVIGATOR.ANIMATE" }),
    },
    SV: {
      name: intl.formatMessage({ id: "TOP.NAVIGATOR.VIDEO" }),
    },
    SX: {
      name: intl.formatMessage({ id: "TOP.NAVIGATOR.NOVEL" }),
    },
    ST: {
      name: intl.formatMessage({ id: "TOP.NAVIGATOR.MEITU" }),
    },
  };
  return (
    <HomeSearchPageElement ref={containerRef}>
      <TopBarContainer>
        <TopSearchBar
          backArrowCallback={clickTopBackArrow}
          searchBarKeyDown={searchBarKeyDown}
          searchValue={searchBarValue}
          onSearchChange={onSearchChange}
        />
        {searchName ? (
          <TopTabBar labelList={labelList} callback={clickTabLabel} />
        ) : (
          ""
        )}
      </TopBarContainer>
      <div className="container">
        <SwitchRoute
          containerRef={containerRef}
          routes={routes}
          routesStep={4}
        />
      </div>
    </HomeSearchPageElement>
  );
};

export default HomeSearchPage;

export const HomeSearchPageElement = styled.div`
  /*  */
  padding-top: ${main_height}px;

  .container {
    position: relative;
    margin-top: 1%;
  }
`;
