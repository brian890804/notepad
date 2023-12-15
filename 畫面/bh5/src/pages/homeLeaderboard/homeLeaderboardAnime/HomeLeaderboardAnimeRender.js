import React, { useEffect } from "react";
import styled from "@emotion/styled/macro";
import LeaderBoardCard from "../component/LeaderBoardCard";

const HomeLeaderboardAnime = ({ list, getLeaderBoardData }) => {
  useEffect(() => {
    if (list.length === 0) {
      getLeaderBoardData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HomeLeaderboardAnimeRender>
      {list.map((data, index) => {
        return (
          <LeaderBoardCard
            key={data.id}
            id={data.id}
            isComic={false}
            data={data}
            index={index}
          />
        );
      })}
    </HomeLeaderboardAnimeRender>
  );
};

export default HomeLeaderboardAnime;

export const HomeLeaderboardAnimeRender = styled.div`
  /*  */
  @media (min-width: 599px) {
    max-width: 40%;
    min-width: 500px;
  }
`;
