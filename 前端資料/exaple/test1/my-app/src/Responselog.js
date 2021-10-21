import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
export function Responselog({ count, submit }) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [message, setMessage] = useState();
    const handleClickOpen = () => {
        setOpen(true);
        if (count <= 0) {
            setMessage("請選擇購買數量")
        } else {
            submit(count)
            setMessage(" 確認新增" + count + "個到購物車嗎?")
        }
    };
    const handleClose = (quest) => {
        setOpen(false)
    }
    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title"></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        確認
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        否
                    </Button>
                </DialogActions>
            </Dialog>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                購買
            </Button>
        </div>
    );
}
