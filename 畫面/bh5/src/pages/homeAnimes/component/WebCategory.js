import { useContext } from "react";
import { Category } from "../HomeAnimesRender";
import { Grid } from "@mui/material";

import CategoryItem from "./CategoryItem";

const WebCategory = ({ direction }) => {
  const { category, containerRef } = useContext(Category);
  return (
    <Grid
      container
      direction={direction || "row"}
      className="home_animes_category"
      alignItems="center"
      spacing={direction ? 0 : 2}
    >
      {category.map((data, index) => {
        if (index >= 0 && index <= 1) {
          return (
            <Grid item md={1.2} key={data.id}>
              <CategoryItem data={data} containerRef={containerRef} />
            </Grid>
          );
        }
      })}

      {category.map((data, index) => {
        if (index >= 3 && index <= 4) {
          return (
            <Grid item md={1.2} key={data.id}>
              <CategoryItem data={data} containerRef={containerRef} />
            </Grid>
          );
        }
      })}

      {category.map((data, index) => {
        if (index === 7) {
          return (
            <Grid item md={1.2} key={data.id}>
              <CategoryItem
                data={data}
                containerRef={containerRef}
                zoom={Boolean(!direction)}
              />
            </Grid>
          );
        }
      })}

      {category.map((data, index) => {
        if (index > 4 && index !== 7) {
          return (
            <Grid item md={1.2} key={data.id}>
              <CategoryItem data={data} containerRef={containerRef} />
            </Grid>
          );
        }
      })}
    </Grid>
  );
};
export default WebCategory;
