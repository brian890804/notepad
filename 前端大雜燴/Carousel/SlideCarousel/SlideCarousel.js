import React, { useRef } from "react";
import CoverCubeItem from "../../component/CoverCubeItem";
import arrowIcon from "../../../assets/icons/arrow.svg";
const SlideCarousel = ({ items }) => {
  const containerRef = useRef([]);
  let page = 0;

  function onClickEvent(type, e) {
    const pageCount = Math.ceil(items.length / 6); // 计算总页数

    if (type === "next") {
      page = (page + 1) % pageCount; // 取余运算实现循环翻页
    } else {
      page = (page - 1 + pageCount) % pageCount; // 取余运算实现循环翻页
    }

    containerRef.current.forEach((itemRef, index) => {
      if (index <= page * 12) {
        itemRef.style.willChange = "contents";
      } else {
        itemRef.style.willChange = "";
      }
      itemRef.style.transition = "1s";
      itemRef.style.transform = `translateX(-${620 * page}%)`;
    });
  }
  const imgButtonItems = [
    {
      style: {
        transform: "scaleX(-1)",
        position: "absolute",
        left: -30,
        top: "35%",
        zIndex: 999,
      },
      status: "prev",
    },
    {
      style: {
        position: "absolute",
        right: -30,
        top: "35%",
        zIndex: 999,
      },
      status: "next",
    },
  ];

  return (
    <div style={{ position: "relative", alignSelf: "center" }}>
      <div className="home_Main_container_content">
        {items.map((data, index) => {
          return (
            <div
              ref={(ref) => (containerRef.current[index] = ref)}
              className="home_Main_container_content_item"
              key={data.id}
            >
              <CoverCubeItem data={data} />
            </div>
          );
        })}
        {imgButtonItems.map((item) => (
          <img
            src={arrowIcon}
            className="cursor"
            alt="arrowIcon"
            style={item.style}
            onClick={() => onClickEvent(item.status)}
          />
        ))}
      </div>
    </div>
  );
};

export default SlideCarousel;
