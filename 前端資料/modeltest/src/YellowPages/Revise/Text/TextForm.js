import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextFeild } from "./TextFeild";
import TextInput from "./TextInput";
import {CutomizedKeyWord} from "./CutomizedKeyWord";

const ChangePasswordSchema = Yup.object().shape({
    Storename: Yup.string()
        .min(1, "最少需要輸入1個字")
        .max(20, "最多只能輸入20個字")
        .required("請輸入店家名稱*"),
    Uniform: Yup.string()
        .min(7, "請輸入8碼統一編號")
        .max(8, "請輸入8碼統一編號"),
    Storeprincipal: Yup.string()
        .min(1, "最少需要輸入1個字")
        .max(5, "最多只能輸入5個字")
        .required("請輸入負責人*"),
    Englishnickname: Yup.string()
        .min(1, "最少需要輸入1個字")
        .max(5, "最多只能輸入5個字")
        .required("請輸入負責人英文暱稱*"),
    Storephone: Yup.string()
        .min(8, "請輸入正確8碼店家電話")
        .max(8, "請輸入正確8碼店家電話")
        .required("請輸入店家電話*"),
    Storeaddress: Yup.string()
        .min(5, "請輸入正確店家地址")
        .max(30, "請輸入正確8碼店家地址")
        .required("請輸入正確地址*"),
    CutomizedKeyWord:Yup.string()
        .max(5, "請輸入五字以下")
        .required("至少輸入一個字")
});


const initialValues = {
    storename: undefined,
    password: undefined,
    repeatPassword: undefined,
};

export function TextForm() {

    return (
        <>
                <Formik
                    validationSchema={ChangePasswordSchema}
                    initialValues={initialValues}
                >
                    <Form>
                            <TextFeild itemname="店家名稱" placeholder="請輸入店家名稱" name="Storename" />
                            <TextFeild itemname="統一編號" placeholder="請輸入統一編號" name="Uniform" />
                            <TextFeild itemname="店家負責人" placeholder="請輸入店家負責人" name="Storeprincipal" />
                            <TextFeild itemname="負責人英文暱稱" placeholder="請輸入負責人英文暱稱" name="Englishnickname" />
                            <TextFeild itemname="店家電話" placeholder="請輸入店家電話" name="Storephone" />
                            <TextFeild itemname="店家地址" placeholder="請輸入店家地址" name="Storeaddress" />
                            <TextInput itemname="店家營業時間"/>
                            <CutomizedKeyWord itemname="自訂關鍵字"name="CutomizedKeyWord"/>
                    </Form>
                </Formik>
        </>

    );
}