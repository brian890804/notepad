import * as React from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#fff",
  padding: "1% 15%",
  fontSize: "1.4rem",
  borderRadius: "40px",
  backgroundColor: "#f24c7c",
  "&:hover": {
    backgroundColor: "#f24c7c",
  },
}));
type Props = {
  children: any;
  handleClick: any;
  fullWidth?: boolean;
};
const MuiButton: React.FC<Props> = ({ children, handleClick, fullWidth }) => {
  const [disabled, setDisabled] = React.useState(false);
  function onClick() {
    setDisabled(true);
    handleClick();
  }
  React.useEffect(() => {
    if (disabled) {
      setTimeout(() => setDisabled(false), 1500);
    }
  }, [disabled]);
  return (
    <ColorButton
      variant="contained"
      disabled={disabled}
      type={"submit"}
      onClick={onClick}
      style={{ width: fullWidth ? "100%" : "auto" }}
    >
      {children}
    </ColorButton>
  );
};
export default MuiButton;
