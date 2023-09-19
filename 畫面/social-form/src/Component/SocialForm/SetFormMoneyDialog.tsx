import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { colors } from "../../constant";
import styled from "@emotion/styled";
import { styled as MuiStyle } from "@mui/material/styles";
import MuiButton from "../MuiButton";

const CssTextField = MuiStyle(TextField)({
  "& label.Mui-focused": {
    color: colors.text_grey,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: colors.text_grey,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "red",
    },
    "&:hover fieldset": {
      // borderColor: "yellow",
    },
    "&.Mui-focused fieldset": {
      borderColor: colors.back_dark_pink,
    },
  },
});
type Props = {
  children?: React.ReactNode;
  onChange?: any;
};
const SetFormMoneyDialog: React.FC<Props> = ({ children, onChange }) => {
  const [open, setOpen] = React.useState(false);
  const [money, setMoney] = React.useState<any>();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) >= 0) {
      setMoney(Number(e.target.value));
      onChange(Number(e.target.value));
    }
  };
  return (
    <React.Fragment>
      <div onClick={handleClickOpen}>{children}</div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <SetFormMoneyDialogElement>
          <DialogTitle id="alert-dialog-title" className="dialogTitle">
            設定金額
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              平台將收取訂閱金額20%平台服務費
            </DialogContentText>
            <div className="textfield_container">
              <CssTextField
                fullWidth
                type="number"
                id="standard-basic"
                label="輸入金額"
                value={money || null}
                onChange={handleChange}
                variant="standard"
              />
              <div className="diamond">精钻</div>
            </div>
            <div className="received">
              实际获得收益：{Math.round(Number(money) * 0.82 * 100) / 100 || 0}
              精钻/月
            </div>
          </DialogContent>
          <DialogActions>
            <MuiButton handleClick={handleClose} fullWidth>
              确定
            </MuiButton>
          </DialogActions>
        </SetFormMoneyDialogElement>
      </Dialog>
    </React.Fragment>
  );
};
export default SetFormMoneyDialog;
const SetFormMoneyDialogElement = styled.div`
  /*  */
  .textfield_container {
    margin-top: 1em;
    display: flex;
    align-items: baseline;
  }
  .diamond {
    color: ${colors.back_dark_pink};
    font-size: 1rem;
    flex-wrap: nowrap;
    white-space: nowrap;
  }
  .received {
    font-size: 0.8rem;
    color: ${colors.text_light_grey};
    margin-top: 0.5em;
  }
`;
