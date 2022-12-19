import * as React from "react";
import styled from "styled-components";
import "./styles.css";
import useDraggable from "./useDraggable";
import Block from "./Block";
import { useSprings } from "react-spring";

const Wrapper = styled.div`
  ${({ width }) => width && `width: ${width}px;`}
  height: 480px;
  border: 1px solid red;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
`;

const BlockContainer = styled.div`
  flex-grow: 2;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  border: 1px solid black;
`;

const blockInRow = 3;
const totalBlocks = 10;

const immediateMotionsProsp = {
  x: true,
  y: true
};

const getBlockCoordinates = (index) => {
  const col = Math.floor(index % blockInRow);
  const row = Math.floor(index / blockInRow);
  return { x: col * 120 + col * 8, y: 120 * row + row * 8 };
};

const getColor = (i) => {
  const colors = [
    "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
    "linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)"
  ];

  return colors[i % 4];
};

const Grid = () => {
  const parentRef = React.useRef(null);
  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    movingBlockIndex,
    block: movingBlock
  } = useDraggable({
    parentRef
  });

  const blocks = React.useRef(new Array(totalBlocks).fill(0).map((_, i) => i));
  const bgColors = React.useRef(blocks.current.map((i) => getColor(i)));
  const initialCoordinates = React.useRef(
    blocks.current.map((i) => getBlockCoordinates(i))
  );

  const animate = React.useCallback(
    (index) => {
      // the index in order of id
      const blockIndex = blocks.current.indexOf(index);
      // the block coordinates of other blocks
      const blockCoordinate = initialCoordinates.current[blockIndex];

      return {
        x: index === movingBlockIndex ? movingBlock.x : blockCoordinate.x,
        y: index === movingBlockIndex ? movingBlock.y : blockCoordinate.y,
        scale: index === movingBlockIndex ? 1.2 : 1,
        zIndex: index === movingBlockIndex ? 10 : 1,
        immediate:
          movingBlockIndex === index
            ? (n) => immediateMotionsProsp[n]
            : undefined
      };
    },
    [movingBlock, initialCoordinates, movingBlockIndex]
  );

  const [springs, api] = useSprings(blocks.current.length, animate);

  React.useEffect(() => {
    // we will save the actual id/index in movingBlockIndex
    const oldPosition = blocks.current.indexOf(movingBlockIndex);
    if (oldPosition !== -1) {
      // coordinate travelled by the block from it's last position
      const coordinatesMoved = {
        // remember the grid generator function above ?
        // I created an array "initialCoordinates" using it for quick access
        x: movingBlock.x - initialCoordinates.current[oldPosition].x,
        y: movingBlock.y - initialCoordinates.current[oldPosition].y
      };

      // As we have width and height constant, for every block movement
      // in y direction we are actually moving 3 block in row.
      // we are ignoring the padding here, as its impact is so less
      // that you will not even notice
      let y = Math.round(coordinatesMoved.y / 120);
      if (Math.abs(y) > 0.5) {
        y = y * blockInRow;
      }

      const x = Math.round(coordinatesMoved.x / 120);

      const newPosition = y + x + oldPosition;
      // there will be cases when block is not moved enough
      if (newPosition !== oldPosition) {
        let newOrder = [...blocks.current];
        // swaping
        const [toBeMoved] = newOrder.splice(oldPosition, 1);
        newOrder.splice(newPosition, 0, toBeMoved);
        blocks.current = newOrder;
      }
    }

    // telling the spring to animate again
    api.start(animate);
  }, [api, animate, initialCoordinates, movingBlock, movingBlockIndex]);

  return (
    <BlockContainer onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <Wrapper ref={parentRef} width={blockInRow * 120 + (blockInRow - 1) * 8}>
        {springs.map((style, index) => {
          const blockIndex = blocks.current.indexOf(index);
          return (
            <Block
              background={bgColors.current[index]}
              key={index}
              label={index}
              style={style}
              onMouseDown={(e) =>
                handleMouseDown(
                  e,
                  initialCoordinates.current[blockIndex],
                  index
                )
              }
            />
          );
        })}
      </Wrapper>
    </BlockContainer>
  );
};

export default Grid;
