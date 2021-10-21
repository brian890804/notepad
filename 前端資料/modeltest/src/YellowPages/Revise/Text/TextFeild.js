import React from "react"
import { Field } from "formik"
import { NewInput } from "../../../Partial/control/form/NewInput";
export function TextFeild(items) {
    return (
        <>
            <div className="pt-2">
                <Field
                    component={NewInput}
                    name={items.name}
                    placeholder={items.placeholder}
                    label={<b style={{ fontSize: "20px" }}>{`${items.itemname}：`}</b>}
                />
            </div>


        </>
    );
}