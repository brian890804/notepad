import React, { useState } from "react"
import { ValidationSchemaExample } from "./yuptest2";
import member from "../member.json";
import { SettingsBackupRestoreSharp } from "@material-ui/icons";
import { CustomizedSnackbars } from "../FEEBACK/snackBar";
import Grid from "@material-ui/core/Grid";
import AccountCircle from '@material-ui/icons/AccountCircle';
import BottomNavigation from "../auth/BottomNavigation";
const initValue = {
    firstName: '',
    lastName: '',
    email: ''
}
export function ValidationSchemaCard({inpage}) {
    const submit = (request) => {
        sginIn(request)
    }
    const [pass, setPass] = useState(false);
    const [unpass, setUnpass] = useState(false);
    const [info, setInfo] = useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setPass(false);
        setUnpass(false);
        setInfo(false);
    };


    const sginIn = (request) => {
        const found = member.find((element) => element.firstName === request.firstName)
        console.log(found)


        if (found.email === request.email && found.lastName === request.lastName) {
            console.log("通過")
            setPass(true)
            setUnpass(false)
        } else {
            console.log("不通過")
            setPass(false)
            setUnpass(true)
        }

    }

    return (
        <div>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: "auto" }}
            >
                <h1>
                    <AccountCircle />
                </h1>
            </Grid>
            <Grid container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: "auto" }}>
                <ValidationSchemaExample initValue={initValue} submit={submit} />
                <CustomizedSnackbars pass={pass} handleClose={handleClose} unpass={unpass} info={info} />
                <BottomNavigation />
            </Grid>

        </div>
    )
}