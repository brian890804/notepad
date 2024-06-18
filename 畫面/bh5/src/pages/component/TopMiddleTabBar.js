import { useState, useEffect, memo } from "react";
import { useLocation } from "react-router";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { sub_fontSize } from "./TopBarContainer";
import Tabs from "@mui/material/Tabs";
import { colors } from "../../constants";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { main_height } from "./TopBarContainer";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: "3px",
  },
  "& .MuiTabs-indicatorSpan": {
    width: "100%",
    color: `${colors.dark_pink}`,
    backgroundColor: `${colors.dark_pink}`,
  },
});
const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme, length }) => ({
    textTransform: "none",
    fontWeight: "700",
    fontSize: `${sub_fontSize}px`,
    marginRight: theme.spacing(2),
    color: "black",
    [theme.breakpoints.down("sm")]: {
      width: 100 / length + "%",
    },
    "&.Mui-selected": {
      color: `${colors.dark_pink}`,
      height: main_height,
    },
  })
);
const areEqual = (pre, next) => {
  return JSON.stringify(pre) === JSON.stringify(next);
};
function BasicTabs(props) {
  const location = useLocation();
  const { pathname } = location;
  const { labelList, callback } = props;
  const [value, setValue] = useState(0);
  const [labelListKey] = useState(Object.keys(labelList)); // 會員卡 約P卡 視頻卡
  const handleChange = (key, index) => {
    callback(key);
    setValue(index);
  };
  useEffect(() => {
    for (let i = 0; i < labelListKey.length; i++) {
      if (pathname.indexOf(labelListKey[i]) !== -1) {
        setValue(labelListKey.indexOf(labelListKey[i])); //找到位置後抓index存然後初始Tab
        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box className="g-center">
      <StyledTabs value={value} aria-label="basic tabs example">
        {Object.keys(labelList).map((labelKey, index) => (
          <StyledTab
            length={labelList.length}
            label={labelList[labelKey].name}
            key={labelKey}
            onClick={() => {
              handleChange(labelKey, index);
            }}
            {...a11yProps(index)}
          />
        ))}
      </StyledTabs>
    </Box>
  );
}
export default memo(BasicTabs, areEqual);
BasicTabs.propTypes = {
  labelList: PropTypes.object.isRequired,
  callback: PropTypes.func.isRequired,
};
