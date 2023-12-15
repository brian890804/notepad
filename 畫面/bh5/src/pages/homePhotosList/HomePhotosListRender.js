import React, { useEffect, useMemo } from "react";
import styled from "@emotion/styled/macro";
import Grid from "@mui/material/Grid";

import TopBarContainer, { main_height } from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import scrollBottomCallEvent from "../../modules/scrollEvent";
import PictureCard from "../component/PictureCard";
import ImageCarousel from "../component/ImageCarousel";
import { adsKeys } from "../../constants";
import useMediaSetting from "../../reackHook/useMediaSetting";

const HomePhotosList = ({ title, cateId, list, updatePhotosData }) => {
  const { isMobile } = useMediaSetting();
  const showList = useMemo(() => {
    const splitList = [];
    const copyList = [...list];

    while (copyList.length > 12) {
      splitList.push(copyList.splice(0, 12));
    }

    splitList.push(copyList);

    return splitList;
  }, [list]);

  useEffect(() => {
    if (list.length === 0) {
      updatePhotosData(cateId);
    }

    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function scrollEvent() {
    scrollBottomCallEvent((scrollColdEnd) => {
      updatePhotosData(cateId, scrollColdEnd);
    });
  }

  return (
    <HomePhotosListElement>
      <TopBarContainer>
        <TopTitleBar title={title} showBack={true} show_back_color="#ffffff" />
      </TopBarContainer>
      <ImageCarousel
        adsKey={adsKeys.home}
        threeInOneBanner={!isMobile}
        is_cover
        size="banner_main"
      />
      <div className="mt-2" />
      {(showList || []).map((group, index) => (
        <React.Fragment key={`image-group-${index}`}>
          <div className={`${!isMobile && "px-indent"}`} >
            <Grid
              container
              direction="row"
              alignItems="center"
              className="container_photo_box"
              spacing={2}
            >
              {group.map((data) => (
                <Grid item md={2} xs={6} key={data.title}>
                  <PictureCard data={data} key={data.id} />
                </Grid>
              ))}
            </Grid>
          </div>
          {/*  這邊請在修改成需要的廣告和大小 */}
          <div className="split_container">
            {!isMobile && index !== showList.length - 1 && (
              <ImageCarousel
                adsKey={adsKeys.profile_interval}
                threeInOneBanner={!isMobile}
              />
            )}
          </div>
        </React.Fragment>
      ))}
    </HomePhotosListElement>
  );
};

export default HomePhotosList;

export const HomePhotosListElement = styled.div`
  /*  */
  padding-top: ${main_height}px;
  .container {
    display: flex;
    flex-wrap: wrap;
  }

  .split_container {
    padding: 16px 0;
  }

  .container_photo_box {
    padding: 2%;
  }
`;
