import { useState } from "react";
import { styled } from "@mui/material/styles";
import { useIntl } from "react-intl";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { colors } from "../../constants";
import adultIcon from "../../assets/minorsProhibited/img-adult.png";

const Title = styled((props) => <DialogTitle {...props} />)(({ theme }) => ({
  "&.MuiDialogTitle-root": {
    color: colors.back_dark_pink,
    fontWeight: "700",
    textAlign: "center",
    fontSize: "1.2rem",
  },
}));

const Text = styled((props) => <DialogContentText {...props} />)(
  ({ theme }) => ({
    "&.MuiDialogContentText-root": {
      color: colors.text_grey,
      textAlign: "center",
      fontSize: "1.2rem",
    },
  })
);

const ButtonArea = styled((props) => <DialogActions {...props} />)(
  ({ theme }) => ({
    "&.MuiDialogActions-root": {
      color: colors.text_grey,
      alignSelf: "center",
      fontSize: "1.2rem",
    },
  })
);

const MuiButton = styled((props) => <Button {...props} />)(({ preset,theme }) => ({
  "&.MuiButton-root": {
    color: preset ? "#fff" : colors.text_light_grey,
    borderRadius: 35,
    backgroundColor: preset && colors.back_dark_pink,
    width: "120px",
    border: !preset && "1px solid #646464 ",
    fontSize: "0.8rem",
    [theme.breakpoints.up("sm")]: {
      width: "150px",
      fontSize: "1.2rem",
      margin: "0px 15px 15px",
    },
  },
}));

const MuiDialog = styled((props) => <Dialog {...props} />)(({}) => ({
  "&.MuiDialog-root": {
    backdropFilter: "blur(6px)",
  },
}));
const Icon = styled((props) => <img {...props} />)(({}) => ({
  alignSelf: "center",
  width: "120px",
}));

const MinorsProhibitedDialog = () => {
  const lastTime = window.localStorage.getItem("MinorsProhibitedDialog");
  const intl = useIntl();
  const [open, setOpen] = useState(
    lastTime !== null ? parseInt(lastTime + 1000 * 60 * 2) < Date.now() : true
  );
  const handleClose = () => {
    setOpen(false);
    window.localStorage.setItem("MinorsProhibitedDialog", Date.now());
  };
  const handleBackHistory = () => {
    window.history.back();
  };
  return (
    <MuiDialog
      PaperProps={{ sx: { maxWidth: "600px"} }}
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Icon src={adultIcon} alt="成人視頻icon" />
      <Title id="alert-dialog-title">亲爱的用户</Title>
      <DialogContent>
        <Text id="alert-dialog-description">
          本站资讯以及连结含有青少年不宜限制级内容，限18岁以上及愿意接受者方可进入，未满18岁请自行离开。
        </Text>
      </DialogContent>
      <Title id="alert-dialog-title">Dear BHub user</Title>
      <DialogContent>
        <Text id="alert-dialog-description">
          The information and links on BHub contain restricted content. Only
          those over the age of 18 who agree to enter.
        </Text>
      </DialogContent>
      <ButtonArea>
        <MuiButton onClick={handleBackHistory} color="primary">
          {intl.formatMessage({
            id: "MINORS.PROHIBITED.DIALOG.REJECT",
          })}
        </MuiButton>
        <MuiButton onClick={handleClose} preset>
          {intl.formatMessage({
            id: "MINORS.PROHIBITED.DIALOG.AGREE",
          })}
        </MuiButton>
      </ButtonArea>
    </MuiDialog>
  );
};

export default MinorsProhibitedDialog;
