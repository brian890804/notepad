import React from "react";
import {Ezproduct} from "./Ezproduct";
export function EzproductControl(){
    const submit=(request)=>{
        console.log(request)
        return(request);
    }
    console.log(submit)
    return(
        <>
        
        <Ezproduct submit={submit}/>
        </>
        
    );
}