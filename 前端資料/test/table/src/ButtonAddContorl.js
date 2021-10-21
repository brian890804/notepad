import React,{useState}from "react";
import { ButtonAdd } from "./ButtonAdd";
import Button from '@material-ui/core/Button';
import {Responselog} from "./Responselog";
import Grid from '@material-ui/core/Grid';
export function ButtonAddControl({submit}) {
    const [count, setCount] = useState(0);
    const handleClick = (request) => {
        let newCount = count
        request ? newCount += 1 : newCount -= 1
        newCount > 0 ? setCount(newCount) : setCount(0)
        
    }
    return (

        <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={1}
            maxWidth="xs">
            <ButtonAdd handleClick={handleClick} count={count}/>
            <Responselog  count={count} submit={submit}/>
        </Grid>

    );
}