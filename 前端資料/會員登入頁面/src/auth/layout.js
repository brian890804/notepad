import React from "react";
export default function Layout({children}){
    return (
        <div>
            <h1>header</h1>
            {children}
            <h1>footer</h1>
        </div>
    );

}