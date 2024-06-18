import { memo } from "react";
import LinkComponent from "../../component/LinkComponent";
import WavaButton from "../../component/WavaButton";

import { pageUrlConstants } from "../../../constants";

import { isBrowser } from "react-device-detect";

const { home } = pageUrlConstants;
const CategoryItem = memo(({ data, containerRef, zoom }) => {
  return (
    <WavaButton currentRefs={[containerRef]}>
      <LinkComponent
        className="home_animes_category_box_item"
        routes={
          data.url && data.name !== "游戏" && data.name !== "Games"
            ? {
                linkurl: data.url,
              }
            : {
                name:
                  data.name !== "游戏" && data.name !== "Games"
                    ? home.pages.homeMain.pages.homeCategory.name + data.name
                    : home.pages.homeGame.name,
                path:
                  data.name !== "游戏" && data.name !== "Games"
                    ? home.pages.homeMain.pages.homeCategory.path
                    : home.pages.homeGame.path,
                dynamic: {
                  tab: data.name === "排行榜" ? "Leaderboard" : data.name,
                },
              }
        }
      >
        <div
          className={`home_animes_category_box_item_cover `}
          style={{ width: zoom && "70%" }}
        >
          <img
            className="home_animes_category_box_item_cover_img"
            src={data.img}
            alt={data.name}
            title={data.name}
          />
        </div>
        <div className="home_animes_category_box_item_title">
          <p className="home_animes_category_box_item_title_text">
            {data.name}
          </p>
        </div>
      </LinkComponent>
    </WavaButton>
  );
});
export default CategoryItem;
