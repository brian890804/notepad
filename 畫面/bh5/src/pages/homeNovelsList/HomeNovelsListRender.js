import React, { useEffect } from "react";
import { isBrowser } from "react-device-detect";
import Grid from "@mui/material/Grid";
import styled from "@emotion/styled/macro";
import TopBarContainer, { main_height } from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import NovelCard from "../component/NovelCard";
import ImageCarousel from "../component/ImageCarousel";
import { adsKeys } from "../../constants";
import scrollBottomCallEvent from "../../modules/scrollEvent";

const HomeNovelsListPage = ({ list, title, cateId, updateNovelsData }) => {
  useEffect(() => {
    if (list.length === 0) {
      updateNovelsData(cateId);
    }

    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function scrollEvent() {
    scrollBottomCallEvent((scrollColdEnd) => {
      updateNovelsData(cateId, scrollColdEnd);
    });
  }

  return (
    <HomeNovelsListPageElement>
      <TopBarContainer>
        <TopTitleBar title={title} showBack={true} show_back_color="#ffffff" />
      </TopBarContainer>
      <ImageCarousel
        adsKey={adsKeys.home}
        threeInOneBanner={isBrowser}
        is_cover
        size="banner_main"
      />
      <Grid
        container
        direction="row"
        alignItems="center"
        className={`${isBrowser && "px-indent"}`}
        spacing={0}
      >
        {list.map((data) => {
          return (
            <Grid item md={2} xs={4} key={data.title}>
              <NovelCard key={data.id} data={data} />
            </Grid>
          );
        })}
      </Grid>
    </HomeNovelsListPageElement>
  );
};

HomeNovelsListPage.propTypes = {
  // newNotice: PropTypes.number.isRequired,
  // clickSerch: PropTypes.func.isRequired,
  // clickAvatar: PropTypes.func.isRequired,
  // clickNew: PropTypes.func.isRequired,
};

export default HomeNovelsListPage;

export const HomeNovelsListPageElement = styled.div`
  /*  */
  padding-top: ${main_height}px;
`;
