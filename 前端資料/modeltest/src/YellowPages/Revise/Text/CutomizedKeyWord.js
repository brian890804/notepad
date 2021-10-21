import React, { useState} from "react"
import { Field } from "formik"
import { NewInput } from "../../../Partial/control/form/NewInput";
import ChipsArray from "./Chip";

export function CutomizedKeyWord(items) {
    const [chips, setChips] = useState([]);

    const removeChip=(value) =>{
        let chipsTemp = []
        value.map((chip,index) => {
            chipsTemp.push({key:index,label:chip.label})
        })
        setChips(chipsTemp)
    }

    const addChip = (value) => {
        let chipsTemp = []
        chips.map((chip) => {
            chipsTemp.push(chip)
        })
        if (chipsTemp.length < 4) {
            chipsTemp.push({key:chipsTemp.length,label:<b style={{fontSize:"18px"}}>#{value}</b>})
            setChips(chipsTemp)
        }
    }
    return (
        <>
            <div className="pt-4">
                <div>
                    <Field
                        component={NewInput}
                        name={items.name}
                        label={<b style={{ fontSize: "20px" }}>{`${items.itemname}：`}</b>}
                        action={addChip}
                        enable={true}
                    />
                </div>
                <div className="pt-2">
                    <ChipsArray style={{ width: "100%" }} chips={chips} removeChip={removeChip}/>
                </div>


            </div>
        </>
    );
}