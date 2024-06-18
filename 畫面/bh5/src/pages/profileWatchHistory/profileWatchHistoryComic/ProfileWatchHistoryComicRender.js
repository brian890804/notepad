import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import styled from "@emotion/styled/macro";

import ParallelCoverCubeItem from "../../component/ParallelCoverCubeItem";
import scrollBottomCallEvent from "../../../modules/scrollEvent";

const ProfileWatchHistoryAnime = ({
  dataList,
  getWatchHistory,
  disabledScrollRefresh,
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getWatchHistory(1), []);

  useEffect(() => {
    if (!disabledScrollRefresh) {
      window.addEventListener("scroll", scrollEvent);
      return () => {
        window.removeEventListener("scroll", scrollEvent);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function scrollEvent() {
    scrollBottomCallEvent((scrollColdEnd) => {
      getWatchHistory(1, scrollColdEnd);
    });
  }
  return (
    <ProfileWatchHistoryElement>
      <div className="profile_history_container">
        <Grid container direction="row" alignItems="start">
          {dataList.map((data, index) => (
            <Grid item md={12} xs={12} key={data.id}>
              <ParallelCoverCubeItem
                data={data}
                disabledBottomBorder={index === dataList.length - 1}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </ProfileWatchHistoryElement>
  );
};

export default ProfileWatchHistoryAnime;

export const ProfileWatchHistoryElement = styled.div`
  /*  */
  padding-top: 5%;
  @media (min-width: 599px) {
    padding-top: 1%;
  }
  .profile_history_container {
    position: relative;
  }
  .list_item {
    &:last-of-type {
      &::after {
        content: none;
      }
    }
  }
`;
