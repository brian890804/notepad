import React, { useState, createContext, useLayoutEffect } from "react";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import SetFormMoneyDialog from "../Component/SocialForm/SetFormMoneyDialog";

import { useStore } from "../redux/useStore";
import InputText from "../Component/SocialForm/InputText";
import SelectText from "../Component/SocialForm/SelectText";
import SelectOption from "../Component/SocialForm/SelectOption";
import SwitchScope from "../Component/SocialForm/SwitchScope";
import SelectImg from "../Component/SocialForm/SelectImg";
import TextArea from "../Component/SocialForm/TextArea";
import MuiButton from "../Component/MuiButton";

import { titleFontSize } from "../constant";
import useMediaSetting from "../reactHook/useMediaSetting";
import {
  getFieldData,
  getUserProfile,
  postCreateProfile,
} from "../CRUD/SocialForm/Action";
import callToast from "../Component/toastCall";

export const UploadImgItem = createContext({});
const Provider = UploadImgItem.Provider;

type Props = {
  children?: React.ReactNode;
};
export interface IUseState {
  file: string;
  url: string;
  progress: number;
  delete: boolean;
  key: string;
}

const initFile = {
  file: "",
  url: "",
  progress: 0,
  delete: false,
  key: "",
};
const validationSchema = Yup.object().shape({
  nick_name: Yup.string().required("请输入昵称"),
  phone: Yup.string().matches(/^[1]{1}[0-9]{10}$/, "格式不符合"),
  sex: Yup.number().min(1, "请选择性别"),
  age: Yup.number().min(1, "请选择年龄"),
  city_id: Yup.number().min(1, "请选择城市"),
  shape: Yup.string().required("请选择罩杯"),
  profession: Yup.string().required("请输入职业"),
  miaoshu: Yup.string().required("请输入介绍").max(30, "最多30字"),
});
const initialValues: Public.MyFormValues = {
  sex: 0,
  city_id: 0,
  nick_name: "",
  age: 0,
  qq: "",
  wechat: "",
  tudou: "",
  line: "",
  price: 0,
  miaoshu: "",
  currency: "",
  size: "",
  profession: "",
  shape: "",
  phone: "",
  height: 150,
  coin: [0, 0, 0, 0, 0, 0, 0, 0, 0],
};
const inputListItems = [
  {
    name: "qq",
    placeholder: "请输入QQ",
  },
  {
    name: "wechat",
    placeholder: "请输入whchat",
  },
  {
    name: "tudou",
    placeholder: "请输入tudou",
  },
  {
    name: "line",
    placeholder: "请输入line",
  },
  {
    name: "phone",
    placeholder: "请输入电话 ex:12345678912",
  },
];
const SocialForm: React.FC<Props> = () => {
  const { size } = useMediaSetting();
  const { width } = size;
  const { selectProps, setSelectProps, initSelectProps, setAlertStatus } =
    useStore();
  const [imgPosition, getImgPosition] = useState<any>();
  const [postFileArray, setPostFileArray] = useState<Array<IUseState>>(
    Array(9)
      .join(",")
      .split(",")
      .map((_) => {
        return initFile;
      })
  );
  useLayoutEffect(() => {
    getFieldData(initSelectProps);
    getUserProfile(setAlertStatus);
  }, []);
  function changeImgPosition() {
    //交換位置
    if (imgPosition) {
      if (imgPosition.length > 0) {
        let array: any = [];
        let postFile: Array<IUseState> = [...postFileArray]; //不能用原本的圖片陣列會歪掉
        imgPosition.map(
          (data: { nowPosition: { animation: { to: number } } }) => {
            return array.push(data.nowPosition.animation.to);
          }
        );
        const set = new Set();
        for (let i = 0; i <= 8; i++) {
          const data: any = array[i];
          if (i !== data) {
            if (!set.has(data) && !set.has(i)) {
              const oldTemp = postFile[i];
              postFile[i] = postFile[data];
              postFile[data] = oldTemp;
              set.add(data);
              set.add(i);
            }
          } else {
            set.add(data);
          }
        }
        return postFile;
      }
    }
    return postFileArray;
  }
  function onSubmit(values: Public.MyFormValues) {
    let chartTypeHasOneStatus = false;
    const { qq, wechat, tudou, line, phone } = values;
    let newList = [];
    newList.push(qq, wechat, tudou, line, phone);
    newList.map((data) => data !== "" && (chartTypeHasOneStatus = true));
    //判斷聊天方式有沒有至少填一項
    if (chartTypeHasOneStatus) {
      postCreateProfile(values, changeImgPosition(), setAlertStatus);
    } else {
      callToast("请填写至少一种聊天方式");
    }
  }

  return (
    <SocialFormElement>
      <Formik
        validateOnChange={false} //提升速度
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          onSubmit(values);
          actions.setSubmitting(false);
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <Form noValidate>
            <Grid
              container
              direction={"row"}
              justifyContent="center"
              spacing={1}
            >
              {/* 上半部手機 */}
              {width && width <= 1200 ? (
                <>
                  <Grid item xs sm={12} md={12}>
                    <Provider
                      value={{
                        postFileArray,
                        setPostFileArray,
                        getImgPosition,
                      }}
                    >
                      <SelectImg
                        ImgMoneyArray={values.coin}
                        setImgMoney={(data: Array<number>) =>
                          setFieldValue("coin", data)
                        }
                      />
                    </Provider>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Field
                      name="nick_name"
                      title="暱稱"
                      placeholder="请输入暱称，最多8个字"
                      component={InputText}
                    />
                    {selectProps.map((SelectData) => {
                      if (SelectData.name !== "size") {
                        return (
                          <Field
                            name={SelectData.name}
                            SelectData={SelectData}
                            key={SelectData.name}
                            setControl={setSelectProps}
                            component={SelectText}
                          />
                        );
                      }
                    })}
                    <Field
                      title="身高"
                      name="height"
                      component={SwitchScope}
                      onChange={(e: number) => setFieldValue("height", e)}
                    />
                    {selectProps.map((SelectData) => {
                      if (SelectData.name == "size") {
                        return (
                          <SelectOption
                            key={SelectData.name}
                            SelectData={SelectData}
                            onChange={(e: string) => setFieldValue("size", e)}
                          />
                        );
                      }
                    })}
                  </Grid>
                </>
              ) : (
                <>
                  {/* 上半部PC */}
                  <Grid item lg={6}>
                    <Field
                      name="nick_name"
                      title="暱稱"
                      placeholder={"请输入暱稱"}
                      component={InputText}
                    />
                    {selectProps.map((SelectData) => {
                      if (SelectData.name !== "size") {
                        return (
                          <Field
                            name={SelectData.name}
                            SelectData={SelectData}
                            key={SelectData.name}
                            setControl={setSelectProps}
                            component={SelectText}
                          />
                        );
                      }
                    })}
                    <Field
                      title="身高"
                      name="height"
                      component={SwitchScope}
                      onChange={(e: number) => setFieldValue("height", e)}
                    />
                    {selectProps.map((SelectData) => {
                      if (SelectData.name == "size") {
                        return (
                          <SelectOption
                            key={SelectData.name}
                            SelectData={SelectData}
                            onChange={(e: string) => setFieldValue("size", e)}
                          />
                        );
                      }
                    })}
                  </Grid>
                  <Grid item lg={6}>
                    <Provider
                      value={{
                        postFileArray,
                        setPostFileArray,
                        getImgPosition,
                      }}
                    >
                      <SelectImg
                        ImgMoneyArray={values.coin}
                        setImgMoney={(data: Array<number>) =>
                          setFieldValue("coin", data)
                        }
                      />
                    </Provider>
                  </Grid>
                </>
              )}

              {/* 下半部 */}
              <Grid item xs={12}>
                <Field
                  name="profession"
                  title="职业"
                  component={InputText}
                  placeholder="请输入职业"
                />
                <Field
                  name="miaoshu"
                  title="职业"
                  component={TextArea}
                  placeholder="请输入介绍"
                  onChange={(props: string) => setFieldValue("miaoshu", props)}
                />
                <div className="grid_container">
                  <>
                    <div className="grid_container_label">
                      聊天方式 至少填写一种
                    </div>
                    {inputListItems.map((item) => (
                      <Field
                        key={item.name}
                        name={item.name}
                        item={item}
                        component={InputText}
                        placeholder={item.placeholder}
                      />
                    ))}
                  </>
                </div>
              </Grid>
            </Grid>
            <SetFormMoneyDialog
              onChange={(newPrice: any) => setFieldValue("price", newPrice)}
            >
              <div className="setting_money">
                {values.price ? values.price + " 精钻" : "設定金額"}
              </div>
            </SetFormMoneyDialog>
            <div className="button_container">
              <MuiButton handleClick={handleSubmit}>确定送出</MuiButton>
            </div>
          </Form>
        )}
      </Formik>
    </SocialFormElement>
  );
};

export default SocialForm;
const SocialFormElement = styled.div`
  /*  */
  font-size: ${titleFontSize};
  @media (max-width: 599px) {
    min-width: 50px;
  }
  .MuiInputLabel-root.Mui-focused {
    color: #5c5c5c;
    font-weight: 600;
    border: 3px sold black;
  }
  textarea {
    width: 100%;
    border-radius: 4px;
    position: relative;
    background-color: #f3f4f5;
    border: 1px solid #ced4da;
    font-size: 1.2rem;
    padding: 10px 12px;
    -webkit-transition: border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transition: border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    text-align: start;
  }
  .grid_container {
    gap: 10px;
    display: grid;
    &_label {
      margin-top: 1.5em;
      text-align: start;
    }
  }
  .button_container {
    margin-top: 2em;
    display: flex;
    justify-content: center;
    text-align: center;

    &_content {
      border: 0px;
      font-size: 1.4rem;
      color: #fff;
      border-radius: 40px;
      background-color: #f24c7c;
      cursor: pointer;
    }
  }
  .setting_money {
    color: #39b3fd;
    text-align: start;
    text-decoration: underline;
    cursor: pointer;
    margin-top: 0.5em;
  }
`;
