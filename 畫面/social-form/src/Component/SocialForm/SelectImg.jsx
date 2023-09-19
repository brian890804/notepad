import React, { useCallback, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSprings, animated } from "react-spring";

import useDraggable from "./useDraggable";
import { updateFileEventModule } from "../../utilities";
import { colors } from "../../constant";
import { UploadImgItem } from "../../Pages/SocialForm";
import useMediaSetting from "../../reactHook/useMediaSetting";

import cancelImg from "../../assets/btn-cancel.svg";
import SetFormMoneyDialog from "./SetFormMoneyDialog";
const initFile = {
  file: "",
  url: "",
  progress: 0,
  delete: false,
  key: "",
};
const imgHeight = 200;
const imgWidth = 150;

const BlockContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${imgWidth * 3 + 30 * 3}px;
  height: ${imgHeight * 3 + 30 * 4}px;

  @media (max-width: 599px) {
    height: ${window.innerHeight / 1.15}px;
    width: ${window.innerWidth / 1.1}px;
  }
`;

const Wrapper = styled.div`
  width: ${imgWidth * 3 + 30 * 3}px;
  height: ${imgHeight * 3 + 30 * 4}px;
  overflow: hidden;
  position: relative;

  @media (max-width: 499px) {
    height: 100%;
    width: 100%;
  }
`;

const BlockWrapper = styled(animated.div)`
  position: absolute;
  flex-shrink: 0;
  height: ${imgHeight}px;
  width: ${imgWidth}px;
  padding: 1%;
  padding-top: 1%;
  @media (max-width: 499px) {
    height: 28%;
    width: 31%;
  }
`;

const blockInRow = 3;
const totalBlocks = 9;

const immediateMotionsProps = {
  x: true,
  y: true,
};

const SelectImg = ({ setImgMoney, ImgMoneyArray }) => {
  const parentRef = useRef(null);
  const blockRef = useRef([]);

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchDown,
    movingBlockIndex,
    block: movingBlock,
  } = useDraggable({
    parentRef,
    getPosition,
  });
  const { isMobile } = useMediaSetting();
  const blocks = useRef(new Array(totalBlocks).fill(0).map((_, i) => i));
  const { postFileArray, setPostFileArray, getImgPosition } =
    useContext(UploadImgItem);

  //調整格子間距
  const getBlockCoordinates = useCallback(
    (index) => {
      const col = Math.floor(index % blockInRow);
      const row = Math.floor(index / blockInRow);
      const height = isMobile ? window.innerHeight / 4 : imgHeight * 1.08;
      const width = isMobile ? window.innerWidth / 3.3 : imgWidth * 1.08;
      if (isMobile) {
        return { x: col * width * 1.01, y: height * row * 1.15 };
      } else {
        return {
          x: col * width + col * 22,
          y: height * row + row * 22,
        };
      }
    },
    [isMobile]
  );
  const initialCoordinates = useRef(
    blocks.current.map((i) => getBlockCoordinates(i))
  );
  function judePosition(x, y) {
    //算出當前位置
    const width = initialCoordinates.current[1].x;
    const height = initialCoordinates.current[3].y;
    return x / width + (y / height) * 3;
  }
  const animate = useCallback(
    (index) => {
      // the index in order of id
      const blockIndex = blocks.current.indexOf(index);
      // the block coordinates of other blocks
      const blockCoordinate = initialCoordinates.current[blockIndex];
      const newPosition = judePosition(movingBlock.x, movingBlock.x);
      const oldPosition = judePosition(blockCoordinate.x, blockCoordinate.y);
      return {
        x: index === movingBlockIndex ? movingBlock.x : blockCoordinate.x,
        y: index === movingBlockIndex ? movingBlock.y : blockCoordinate.y,
        scale: index === movingBlockIndex ? 1.1 : 1,
        zIndex: index === movingBlockIndex ? 10 : 1,
        immediate:
          movingBlockIndex === index
            ? (n) => immediateMotionsProps[n]
            : undefined,
        nowPosition: movingBlockIndex ? newPosition : oldPosition,
      };
    },
    [movingBlock, initialCoordinates, movingBlockIndex, isMobile]
  );

  let [springs, api] = useSprings(blocks.current.length, animate);
  useEffect(() => {
    // we will save the actual id/index in movingBlockIndex
    const oldPosition = blocks.current.indexOf(movingBlockIndex);
    if (oldPosition !== -1) {
      // coordinate travelled by the block from it's last position
      const coordinatesMoved = {
        // remember the grid generator function above ?
        // I created an array "initialCoordinates" using it for quick access
        x: movingBlock.x - initialCoordinates.current[oldPosition].x,
        y: movingBlock.y - initialCoordinates.current[oldPosition].y,
      };

      // As we have width and height constant, for every block movement
      // in y direction we are actually moving 3 block in row.
      // we are ignoring the padding here, as its impact is so less
      // that you will not even notice
      let y = Math.round(coordinatesMoved.y / imgHeight);
      if (Math.abs(y) > 0.5) {
        y = y * blockInRow;
      }

      const x = Math.round(coordinatesMoved.x / imgWidth);

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
  }, [
    api,
    animate,
    initialCoordinates,
    movingBlock,
    movingBlockIndex,
    isMobile,
  ]);
  useEffect(() => {
    if (springs.animation) {
      springs.animation.toValue = 0;
    }
  }, [springs.animation]);

  function updateFileEvent(event, index) {
    let files = updateFileEventModule(event);
    if (files) {
      postFileArray[index] = files;
      for (let i = 0; i < postFileArray.length; i++) {
        if (postFileArray[i].progress === 100) {
          continue;
        }
        let reader = new FileReader();
        if (postFileArray[i].file) {
          reader.readAsDataURL(postFileArray[i].file);
          reader.onprogress = function (e) {
            postFileArray[i].progress = Math.floor((e.loaded / e.total) * 99);
            setPostFileArray([...postFileArray]);
          };
          reader.onload = function (e) {
            if (e.target) postFileArray[i].url = e.target.result;
            postFileArray.sort((a, b) => b.progress - a.progress); //排序
            setPostFileArray([...postFileArray]);
          };
        }
      }
    }
  }

  function deleteFileEvent(index) {
    postFileArray[index] = initFile;
    setPostFileArray([...postFileArray]);
  }
  function getPosition() {
    getImgPosition(springs);
  }
  const spacingY =
    (parentRef.current?.offsetHeight - blockRef.current[0]?.offsetHeight * 3) /
    3;
  const spacingX =
    (parentRef.current?.offsetWidth - blockRef.current[0]?.offsetWidth * 3) /
    2.5;
  //容器寬度-單格寬度/3
  return (
    <GridElement>
      <BlockContainer
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchCancel={handleMouseUp}
      >
        <Wrapper ref={parentRef}>
          {springs.map((style, index) => {
            const blockIndex = blocks.current.indexOf(index);
            if (postFileArray[index].file) {
              return (
                <React.Fragment>
                  <BlockWrapper
                    ref={(ref) => (blockRef.current[index] = ref)}
                    key={index}
                    style={style}
                    onMouseDown={(e) =>
                      handleMouseDown(
                        e,
                        initialCoordinates.current[blockIndex],
                        index
                      )
                    }
                    onTouchStart={(e) => {
                      handleTouchDown(
                        e,
                        initialCoordinates.current[blockIndex],
                        index
                      );
                    }}
                  >
                    <div className="updatePostFile">
                      <img
                        draggable={false}
                        className="uploadImg_img"
                        src={postFileArray[index].url}
                        onLoad={() => {
                          postFileArray[index].progress = 100;
                          setPostFileArray([...postFileArray]);
                        }}
                        alt=""
                      />
                      <img
                        src={cancelImg}
                        className="updatePostFile_delete"
                        alt="刪除圖標"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteFileEvent(index);
                        }}
                      />
                    </div>
                  </BlockWrapper>
                  {index >= 4 && (
                    <SetFormMoneyDialog
                      onChange={(newPrice) => {
                        ImgMoneyArray[index] = newPrice;
                        setImgMoney(ImgMoneyArray);
                      }}
                    >
                      <div
                        className="setting_money"
                        style={{
                          top:
                            (isMobile ? 2 : 0) + //基底 因為版面沒寫好= =
                            spacingY * Math.floor(index / 3) + //間隔
                            blockRef.current[index]?.offsetHeight * //單格高度
                              (Math.floor(index / 3) + 0.95),
                          left:
                            (isMobile ? 25 : 50) + //基底 因為版面沒寫好= =
                            spacingX * (index % 3) + //間隔
                            blockRef.current[index]?.offsetWidth * (index % 3), //單格寬度
                        }}
                      >
                        {ImgMoneyArray[index]
                          ? ImgMoneyArray[index] + " 精钻"
                          : "設定金額"}
                      </div>
                    </SetFormMoneyDialog>
                  )}
                </React.Fragment>
              );
            } else {
              return (
                <BlockWrapper key={index} style={style}>
                  <label
                    className={"uploadImg"}
                    htmlFor={"uploadImg updatePostFile" + index}
                  >
                    <input
                      type="file"
                      id={"uploadImg updatePostFile" + index}
                      style={{ display: "none" }}
                      accept="image/gif, image/jpeg, image/png, image/jpg, image/bmp, video/mp4"
                      onChange={(e) => {
                        updateFileEvent(e, index);
                      }}
                    />
                  </label>
                </BlockWrapper>
              );
            }
          })}
        </Wrapper>
      </BlockContainer>
      <div className="text">按住可拖移排序</div>
    </GridElement>
  );
};

export default SelectImg;
const GridElement = styled.div`
  /*  */
  display: flex;
  align-items: end;
  flex-direction: column;
  overflow: hidden;
  flex-wrap: wrap;
  align-items: center;
  @media (max-width: 1200px) {
    flex-wrap: nowrap;
  }
  .text {
    width: ${imgWidth * 3 + 30 * 2}px;
    font-size: 1.2rem;
    margin-top: 0.5em;
    color: ${colors.text_grey};
  }

  .uploadImg {
    cursor: pointer;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    position: relative;
    background-color: ${colors.background_gray};
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      border-radius: 10px;
      box-shadow: rgba(92, 92, 92, 0.25) 0 0 0 0.2rem;
      border-color: #5c5c5c;
    }

    &::before {
      content: "";
      position: absolute;
      background-color: black;
      width: 46px;
      height: 4px;
      transform: rotate(180deg);
      border-radius: 2px;
      background-color: #646464;
    }
    &::after {
      content: "";
      position: absolute;
      background-color: black;
      width: 46px;
      height: 4px;
      transform: rotate(90deg);
      border-radius: 2px;
      background-color: #646464;
    }
    &_img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      object-fit: cover;
    }
    &_label {
      width: 100%;
      height: 100%;
      cursor: pointer;
      vertical-align: middle;
      object-fit: cover;
    }
  }
  .updatePostFile {
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: ${colors.background_gray};

    &_delete {
      position: absolute;
      right: -5px;
      bottom: -10px;
      width: 50px;
      @media (max-width: 599px) {
        right: -2px;
        width: 30px;
      }
    }
  }

  .setting_money {
    position: absolute;
    color: #39b3fd;
    text-align: center !important;
    text-decoration: underline;
    cursor: pointer;
    margin-top: 0.5em;
  }
`;
