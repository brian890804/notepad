import * as React from "react";
import { styled as muiStyle } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { colors } from "../../constant";
const MuiToggleButton = muiStyle(ToggleButton)(({ theme }) => ({
  "&.MuiToggleButtonGroup-grouped:not(:last-of-type),&.MuiToggleButtonGroup-grouped:not(:first-of-type)":
    {
      borderRadius: "3px !important",
      borderLeft: "auto!important",
      borderRight: "auto!important",
      border: "2px solid rgba(0, 0, 0, 0.12)",
      color: colors.text_grey,
      backgroundColor: colors.background_gray,
      fontSize: "1rem",
      marginTop: "0.2em",
      [theme.breakpoints.up("sm")]: {
        padding: "0.5em 1em",
      },
    },
  "&.Mui-selected": {
    border: `2px solid ${colors.back_dark_pink}!important`,
  },
}));
type Props = {
  SelectData?: any;
  onChange: (e: string) => void;
};
const SelectOption: React.FC<Props> = ({ onChange, SelectData }) => {
  const [alignment, setAlignment] = React.useState("2");
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
    onChange(newAlignment);
  };
  React.useEffect(() => {
    onChange("2");
  }, []);

  const children = SelectData.options.map((data: string, index: number) => (
    <MuiToggleButton value={index + ""} key={"MuiToggleButton" + index}>
      {data}
    </MuiToggleButton>
  ));

  const control = {
    value: alignment,
    onChange: handleChange,
    exclusive: true,
  };

  return (
    <Stack spacing={2} alignItems="start" style={{ marginBottom: " 0.5em" }}>
      {SelectData.label}
      <ToggleButtonGroup
        size="small"
        {...control}
        aria-label="Small sizes"
        sx={{
          "&.MuiToggleButtonGroup-root": {
            width: "100%",
            justifyContent: "space-between",
          },
        }}
      >
        {children}
      </ToggleButtonGroup>
    </Stack>
  );
};

export default SelectOption;
