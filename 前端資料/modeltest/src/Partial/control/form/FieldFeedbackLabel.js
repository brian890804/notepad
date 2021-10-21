import { colors } from "@material-ui/core";
import React from "react";

const inputLabel = ({ label, touched, error, customFeedbackLabel }) => {
  if (touched && error) {
    return <div className="invalid-feedback" style={{display: "block"}}>{error}</div>;
  }

  // if (touched && !error && label) {
  //   return <div className="valid-feedback" style={{display: "block"}}>輸入正確</div>;
  // }

  return (
    <div className="feedback">
      {customFeedbackLabel && <>{customFeedbackLabel}</>}
      {!customFeedbackLabel && (
        <>
          {/* 請輸入 <b>{label}</b> */}
        </>
      )}
    </div>
  );
};

const selectLabel = ({ label, touched, error, customFeedbackLabel }) => {
  if (touched && error) {
    return <div className="invalid-feedback">{error}</div>;
  }

  return (
    <div className="feedback">
      {customFeedbackLabel && <>{customFeedbackLabel}</>}
      {!customFeedbackLabel && label && (
        <>
          {/* 請選擇 <b>{label}</b> */}
        </>
      )}
    </div>
  );
};

export function FieldFeedbackLabel({
  label,
  touched,
  error,
  type,
  customFeedbackLabel
}) {
  switch (type) {
    case "text":
      return inputLabel({ label, touched, error, customFeedbackLabel });
    case "email":
      return inputLabel({ label, touched, error, customFeedbackLabel });
    case "password":
      return inputLabel({ label, touched, error, customFeedbackLabel });
    case "number":
      return inputLabel({ label, touched, error, customFeedbackLabel });
    default:
      return selectLabel({ label, touched, error, customFeedbackLabel });
  }
}
