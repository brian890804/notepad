import { useContext,memo } from "react";
import { Category } from "../HomeAnimesRender";
import { Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import CategoryItem from "./CategoryItem";
import { colors } from "../../../constants";
import styled from "@emotion/styled/macro";
// Import Swiper styles
import "../../component/swiper.css";
// import required modules
import { Pagination } from "swiper";

const MobileCategory = memo(() => {
  const { category, containerRef } = useContext(Category);
  return (
    <MobileCategoryElement>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="swiper-pagination-center"
      >
        <div className="category_meta">
          {category[7] && (
            <CategoryItem data={category[7]} containerRef={containerRef} />
          )}
          {/* 這邊比較特別 因為 種類的API還沒有換 所以呈現的內容不存在 會吐錯 先這樣處理  */}
        </div>
        <Grid>
          <SwiperSlide
            style={{ padding: "20px 0" }}
            className="home_animes_category"
          >
            {category.map((data, index) => {
              if (index >= 0 && index <= 1) {
                return (
                  <Grid item xs key={data.id}>
                    <CategoryItem data={data} containerRef={containerRef} />
                  </Grid>
                );
              }
            })}
            <Grid item xs />
            {category.map((data, index) => {
              if (index >= 3 && index <= 4) {
                return (
                  <Grid item xs key={data.id}>
                    <CategoryItem data={data} containerRef={containerRef} />
                  </Grid>
                );
              }
            })}
          </SwiperSlide>
          <SwiperSlide
            style={{ padding: "20px 0" }}
            className="home_animes_category"
          >
            {category.map((data, index) => {
              if (index >= 5 && index <= 6) {
                return (
                  <Grid item xs key={data.id}>
                    <CategoryItem data={data} containerRef={containerRef} />
                  </Grid>
                );
              }
            })}
            <Grid item xs />
            {category.map((data, index) => {
              if (index >= 8 && index <= 9) {
                return (
                  <Grid item xs key={data.id}>
                    <CategoryItem data={data} containerRef={containerRef} />
                  </Grid>
                );
              }
            })}
          </SwiperSlide>
        </Grid>
      </Swiper>
    </MobileCategoryElement>
  );
});
export default MobileCategory;
export const MobileCategoryElement = styled.div`
  /*  */
  background-color: ${colors.light_pink};
  border-bottom: 10px solid ${colors.back_grey};
  .category_meta {
    position: absolute;
    top: 45%;
    left: 50%;
    z-index: 999;
    background-color: ${colors.light_pink};
    transform: translate(-50%, -50%);
    height:70%;
    width:23%;
  }
`;
