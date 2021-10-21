/*old */
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom'
export default function InputGender() {
    const [change, setChange] = useState("M");


    const onSelect=(value)=>{
        setChange(value)
        console.log(value)
    }

    return (<select onChange={(e) => { onSelect(e.target.value) }}>
        <option value="M">男</option>
        <option value="W">女</option>
    </select>);

}
