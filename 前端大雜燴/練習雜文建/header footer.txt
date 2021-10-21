import React from "react"

export default function layout({ children }) {
    return (
        <div>
            <h1>我是header</h1>
            {children}
            <h1>我是footer</h1>
        </div>
    )
}
