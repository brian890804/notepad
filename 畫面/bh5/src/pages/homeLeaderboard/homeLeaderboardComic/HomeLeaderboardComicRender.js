import React, { useEffect } from "react";
import styled from "@emotion/styled/macro";
import LeaderBoardCard from "../component/LeaderBoardCard";

const HomeLeaderboardComic = ({ list, getLeaderBoardData }) => {
  useEffect(() => {
    if (list.length === 0) {
      getLeaderBoardData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HomeLeaderboardComicRender>
      {list.map((data, index) => {
        return (
          <LeaderBoardCard
            key={data.id}
            id={data.id}
            isComic={true}
            data={data}
            index={index}
          />
        );
      })}
    </HomeLeaderboardComicRender>
  );
};

export default HomeLeaderboardComic;

export const HomeLeaderboardComicRender = styled.div`
  /*  */
  @media (min-width: 599px) {
    max-width: 40%;
    min-width: 500px;
  }
`;
