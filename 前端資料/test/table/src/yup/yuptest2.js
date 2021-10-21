import React, { useState } from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { MaterialInput } from "../component/MaterialInput";
import Button from '@material-ui/core/Button';
const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('必填'),
    lastName: Yup.string()
        .min(2, 'Too Shot!')
        .max(50, 'Too Long!')
        .required('必填'),
    email: Yup.string().email('Invalid email').required('必填'),
});



export function ValidationSchemaExample({ initValue, submit }) {

    return (<div>

        <Formik  // 預設值
            initialValues={initValue}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
                console.log(values)
                submit(values)
            }

            }
        >
            {({ handleSubmit, setFieldValue, errors, touched }) => (
                <Form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <Field name="firstName"component={MaterialInput} label="名子" />
                    </div>
                    <div className="mb-2">
                        <Field name="lastName" component={MaterialInput} label="姓氏" />
                    </div>
                    <div className="mb-2">
                        <Field name="email" type="email"component={MaterialInput} label="郵件" />
                    </div>
                    <div className="mb-2  ml-5">
                        <Button type="submit"variant="contained"color="primary" className="ml-4" >登錄</Button>
                    </div>
                    
                </Form>
            )}
        </Formik>
        
    </div>)
}

