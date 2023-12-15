import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import styled from "@emotion/styled/macro";
import TopBarContainer, { main_height } from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import scrollBottomCallEvent from "../../modules/scrollEvent";
import CoverCubeItem from "../component/CoverCubeItem";
import useMediaSetting from "../../reackHook/useMediaSetting";

const HomeLabel = ({ title, type, dataList, getTabData }) => {
  const { isMobile } = useMediaSetting();

  useEffect(() => {
    if (dataList.length === 0) {
      getTabData({
        type,
        tag_gp: title,
      });
    }

    window.removeEventListener("scroll", scrollEvent);
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function scrollEvent() {
    scrollBottomCallEvent((scrollColdEnd) => {
      getTabData(
        {
          type,
          tag_gp: title,
        },
        scrollColdEnd
      );
    });
  }

  function judeType(type) {
    switch (type) {
      case "0":
        return "animated";
      case "1":
        return "comic";
      default:
        return "video";
    }
  }
  return (
    <HomeLableElement>
      <TopBarContainer>
        <TopTitleBar title={title} showBack={true} show_back_color="#ffffff" />
      </TopBarContainer>
      <div className="container">
        <Grid
          container
          direction="row"
          alignItems="center"
          spacing={isMobile ? 1 : 4}
        >
          {dataList.map((data) => {
            return (
              <Grid
                item
                md={parseInt(type) ? 2 : 3}
                xs={parseInt(type) ? 4 : 6}
                key={data.id}
              >
                <CoverCubeItem data={data} type={judeType(type)} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </HomeLableElement>
  );
};

export default HomeLabel;

export const HomeLableElement = styled.div`
  /*  */
  padding-top: ${main_height}px;
  margin-top: 2%;
  @media (min-width: 599px) {
    margin-left: 10%;
    margin-right: 10%;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    padding: 0 0.5em;
  }
`;
