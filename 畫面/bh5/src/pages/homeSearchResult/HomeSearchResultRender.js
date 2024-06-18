import React, { useEffect } from "react";
import styled from "@emotion/styled/macro";
import { sub_height } from "../component/TopBarContainer";
import SwitchRoute from "../component/SwitchRoute";
import scrollBottomCallEvent from "../../modules/scrollEvent";

const HomeSearchResultPage = ({
  searchResult,
  pathneme,
  routes,
  updateSearchResult,
  addHistoryTab
}) => {

  useEffect(()=>{
    let path = pathneme.split("/");
    addHistoryTab(path[4]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  useEffect(()=>{
    let path = pathneme.split("/");
    if(!searchResult[path[4]] || searchResult[path[4]][path[5]]?.page === 0) {
      updateSearchResult(pathneme);
    }

    window.removeEventListener("scroll", scrollEvent);
    window.addEventListener("scroll", scrollEvent);
    return(()=>{
      window.removeEventListener("scroll", scrollEvent);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathneme]);

  function scrollEvent() {
    scrollBottomCallEvent((scrollColdEnd)=>{
      updateSearchResult(pathneme, scrollColdEnd);
    })
  }

  return (
    <HomeSearchResultPageElement>
      <div className="container">
        <SwitchRoute
          routes={routes}
          routesStep={5}
          exact={true}
        />
      </div>
    </HomeSearchResultPageElement>
  )
  ;
};

export default HomeSearchResultPage;

export const HomeSearchResultPageElement = styled.div`/*  */
padding-top: ${sub_height}px;

.container {
  position: relative;
}
`;
