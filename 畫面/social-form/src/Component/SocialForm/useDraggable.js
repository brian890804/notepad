import * as React from "react";
import { isInside } from "./isInside";

const useDraggable = ({ parentRef,getPosition }) => {
  const [coordinate, setCoordinate] = React.useState({
    block: { x: 0, y: 0 },
    blockInitial: { x: 0, y: 0 },
    initial: { x: 0, y: 0 },
    movingBlockIndex: null,
  });
  const handleMouseUp = React.useCallback(() => {
    document.body.style.overflow = "unset";
    document.body.style.height = "unset";
    document.ontouchmove = undefined;
    getPosition();
    setCoordinate((prev) => {
      return {
        ...prev,
        movingBlockIndex: null,
      };
    });
  }, []);

  const handleMouseMove = React.useCallback(
    (event) => {
      if (event.clientX) {
        if (coordinate.movingBlockIndex === null) {
          return;
        }
        const coordinates = { x: event.clientX, y: event.clientY };
        if (
          parentRef.current &&
          !isInside(parentRef.current, {
            left: coordinates.x,
            top: coordinate.y,
          })
        ) {
          handleMouseUp();
          return;
        }
        setCoordinate((prev) => {
          const diff = {
            x: coordinates.x - prev.initial.x,
            y: coordinates.y - prev.initial.y,
          };
          return {
            ...prev,
            block: {
              x: prev.blockInitial.x + diff.x,
              y: prev.blockInitial.y + diff.y,
            },
          };
        });
      }
    },
    [coordinate, parentRef, handleMouseUp]
  );

  const handleMouseDown = React.useCallback((event, block, index) => {
    if (event.clientX) {
      const startingCoordinates = {
        x: event.clientX,
        y: event.clientY,
      };
      setCoordinate((prev) => ({
        ...prev,
        block,
        blockInitial: block,
        initial: startingCoordinates,
        movingBlockIndex: index,
      }));
    }
    event.stopPropagation();
  }, []);

  const handleTouchMove = React.useCallback(
    (event) => {
      if (coordinate.movingBlockIndex === null) {
        return;
      }
      if (event.changedTouches[0]) {
        const coordinates = {
          x: event.changedTouches[0].clientX,
          y: event.changedTouches[0].clientY,
        };

        if (
          parentRef.current &&
          !isInside(parentRef.current, {
            left: coordinates.x,
            top: coordinate.y,
          })
        ) {
          handleMouseUp();
          return;
        }
        setCoordinate((prev) => {
          const diff = {
            x: coordinates.x - prev.initial.x,
            y: coordinates.y - prev.initial.y,
          };
          return {
            ...prev,
            block: {
              x: prev.blockInitial.x + diff.x,
              y: prev.blockInitial.y + diff.y,
            },
          };
        });
      }
    },
    [coordinate, parentRef, handleMouseUp]
  );
  const handleTouchDown = React.useCallback((event, block, index) => {
    if (event.changedTouches[0]) {
      document.body.style.height = "calc(var(--vh, 1vh) * 100)";
      setTimeout(() => {
        document.body.style.overflow = "hidden";
      }, 0);
      document.ontouchmove = function (e) {
        e.preventDefault();
      };
      const startingCoordinates = {
        x: event.changedTouches[0].clientX,
        y: event.changedTouches[0].clientY,
      };
      setCoordinate((prev) => ({
        ...prev,
        block,
        blockInitial: block,
        initial: startingCoordinates,
        movingBlockIndex: index,
      }));
    }

    event.stopPropagation();
  }, []);

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchDown,
    handleTouchMove,
    block: coordinate.block,
    movingBlockIndex: coordinate.movingBlockIndex,
  };
};

export default useDraggable;
