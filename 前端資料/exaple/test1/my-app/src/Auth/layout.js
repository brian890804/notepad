import React from "react";
import Contrainer from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconBreadcrumbs from "./Breadcrumbs"
import img from "../img/AK.jpg";
import 'antd/dist/antd.css';
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children }) => {
    const style={
        bg:{
            color:'rgba(0,0,0,.25)',
            backgroundImage:`url(${"https://twgreatdaily.com/images/elastic/1ty/1ty80mwBJleJMoPMlqnw.jpg"})`,
            backgroundSize:"100%,100%",
        }
    }

    return (
        
        <div >
            <Contrainer maxWidth='lg'>
                <Paper className='' style={{ width: "100%" }}>
                    <Contrainer maxWidth='lg'>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            style={{ minHeight: "600px" }}
                        >
                            <img src={img}width="20%"height="20%" alt="a" draggable="false"/>
                            {children}
                            <div className="logo" style ={style.bg}>
                            <h1><IconBreadcrumbs/></h1>
                            </div>
                            
                        </Grid>
                    </Contrainer>
                </Paper>
            </Contrainer>

        </div>
    )
}
