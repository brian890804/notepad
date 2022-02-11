import React from "react"
import "../Member/CSS/Aivalue.css"
import Animation from "../Video/aiv.mp4"

export default function Aiv({children}) {
    return (
        <>
            <div className="wrap">
                <div className="banner">
                    <video autoPlay muted >
                        <source src={Animation} type="video/mp4" />
                    </video>
                    <h2>{children}</h2>
                </div>
            </div>
        </>
    )
}