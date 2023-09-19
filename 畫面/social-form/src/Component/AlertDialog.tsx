import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { colors } from "../constant";
import styled from "@emotion/styled";
import MuiButton from "./MuiButton";
import { useStore } from "../redux/useStore";

type Props = {};
const AlertDialog: React.FC<Props> = () => {
  const { alertStatus, setAlertStatus } = useStore();
  const { status, title, content } = alertStatus;
  const handleClose = () => {
    alertStatus.status = false;
    setAlertStatus(alertStatus);
  };

  return (
    <React.Fragment>
      <Dialog
        open={status}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <AlertDialogElement>
          <DialogTitle id="alert-dialog-title" className="dialogTitle">
            {title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <MuiButton handleClick={handleClose} fullWidth>
              确定
            </MuiButton>
          </DialogActions>
        </AlertDialogElement>
      </Dialog>
    </React.Fragment>
  );
};
export default AlertDialog;
const AlertDialogElement = styled.div`
  /*  */
  @media (min-width: 599px) {
    min-width: 350px;
  }
  padding: 5% 0%;
  align-self: center;
  .dialogTitle {
    font-size: 1.5rem;
    font-weight: 600;
  }
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
