import * as React from "react";
import { isInside } from "./isInside";

const useDraggable = ({ parentRef }) => {
  const [coordinate, setCoordinate] = React.useState({
    block: { x: 0, y: 0 },
    blockInitial: { x: 0, y: 0 },
    initial: { x: 0, y: 0 },
    movingBlockIndex: null
  });

  const handleMouseUp = React.useCallback(() => {
    setCoordinate((prev) => ({
      ...prev,
      movingBlockIndex: null
    }));
  }, []);

  const handleMouseMove = React.useCallback(
    (event) => {
      if (coordinate.movingBlockIndex === null) {
        return;
      }
      const coordinates = { x: event.clientX, y: event.clientY };

      if (
        parentRef.current &&
        !isInside(parentRef.current, {
          left: coordinates.x,
          top: coordinate.y
        })
      ) {
        handleMouseUp();
        return;
      }
      setCoordinate((prev) => {
        const diff = {
          x: coordinates.x - prev.initial.x,
          y: coordinates.y - prev.initial.y
        };
        return {
          ...prev,
          block: {
            x: prev.blockInitial.x + diff.x,
            y: prev.blockInitial.y + diff.y
          }
        };
      });
    },
    [coordinate, parentRef, handleMouseUp]
  );

  const handleMouseDown = React.useCallback((event, block, index) => {
    const startingCoordinates = { x: event.clientX, y: event.clientY };
    setCoordinate((prev) => ({
      ...prev,
      block,
      blockInitial: block,
      initial: startingCoordinates,
      movingBlockIndex: index
    }));
    event.stopPropagation();
  }, []);

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    block: coordinate.block,
    movingBlockIndex: coordinate.movingBlockIndex
  };
};

export default useDraggable;
