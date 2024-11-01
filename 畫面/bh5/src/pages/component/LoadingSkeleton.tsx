import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import styled, { StyledComponent } from "@emotion/styled/macro";
import { Waypoint } from 'react-waypoint';
import { Theme } from '@emotion/react';

type Props = {
  height?: string,
  children: ReactNode
}

const LoadingSkeleton: FC<Props>  = ({
  height= '100%',
  children
}) => {
  const [enter, setEnter] = useState(false);
  const handleWaypointEnter = () => {
    setEnter(true);
  }

  return (
    <Waypoint
      onEnter={handleWaypointEnter}
    >
      {!enter ? (
        <LoadingSkeletonElement paddingBottom={height}>
          <div
            className="loading-skelton"
            style={{
              paddingBottom: height,
            }}
          />
        </LoadingSkeletonElement>
      ): children
      }
    </Waypoint>
  );
};

export default LoadingSkeleton;


const LoadingSkeletonElement= styled.div<{ paddingBottom: string}>`
  /*  */
  width: 100%;

  @keyframes pulse-animation {
    0% {
      opacity: 1;
    }

    50% {
      opacity: 0.5;
    }

    100% {
      opacity: 1;
    }
  }

  .loading-skelton {
    width: 100%;
    animation: pulse-animation 1.5s ease-in-out 0.5s infinite;
    background-color: #e2e8f1;
  }
`;
