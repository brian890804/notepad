import React, { useState } from "react"
import { toAbsoluteUrl } from "../../help/AssetsHelpers"
import pic2 from "../../img/upload.png"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'none',
    },
    background: {
        backgroundSize: "100% 100%",
        minWidth: "100%",
        minHeight: "100px",
    },
}));

export function UploadPic(items) {
    const classes = useStyles();
    const [imgfile, setImgFile] = useState();
    const [mouseOver, setMouseOver] = useState(false)

    const handleImageChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0]
        console.log(reader)
        reader.onloadend = () => {
            setImgFile(reader.result)

        }
        if (file) {
            reader.readAsDataURL(file);

        }

    }
    return (
        <>


            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item>
                    <input
                        id={items.name}
                        type="file"
                        accept="image/*"
                        className={classes.root}
                        onChange={(e) => {
                            handleImageChange(e)
                        }}
                    />
                </Grid>

                <Grid item>
                    <label htmlFor={items.name}>
                        <img
                            draggable="false"
                            src={imgfile ? imgfile : pic2}
                            style={{
                                width: "100%",
                                height: "100%",
                                filter: mouseOver ? "blur(3px)" : "blur(0px)",
                            }}
                            onMouseEnter={() => {
                                setMouseOver(true)
                            }}
                            onMouseLeave={() => {
                                setMouseOver(false)
                            }}
                        >
                        </img>
                    </label>
                </Grid>

            </Grid>



            <div>
                <span className="form-text text-muted">
                    圖片單張最大為8MB
                </span>
            </div>
        </>
    );
}
