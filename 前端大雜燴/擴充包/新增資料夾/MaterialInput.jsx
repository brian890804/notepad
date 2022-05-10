import React from "react";
import { FieldFeedbackLabel } from "./FieldFeedbackLabel";
const getFieldCSSClasses = (touched, errors) => {
  const classes = ["form-control", "form-control-sm", "form-control-solid"];
  if (touched && errors) {
    classes.push("is-invalid");
  }

  if (touched && !errors) {
    classes.push("is-valid");
  }

  return classes.join(" ");
};
export default function MaterialInput({
  field,
  form: { touched, errors },
  label,
  placeholder,
  type,
  customFeedbackLabel,
  ...props
}) {
  return (
    <>
      <label className="col-lg-3 col-xl-3" style={{ fontSize: 16, paddingTop: 5, color: "#5C5C5C", fontWeight: '600' }} >{label}</label>
      <div className="col-lg-9 col-xl-9 ">
        <input
          placeholder={label}
          className={getFieldCSSClasses(
            touched[field.name],
            errors[field.name]
          )}
          type={type}
          error={touched[field.name] && errors[field.name]}
          {...field}
          {...props}
        />
        <FieldFeedbackLabel
          error={errors[field.name]}
          touched={touched[field.name]}
          label={label}
          type={type}
          customFeedbackLabel={customFeedbackLabel}
        />
      </div>
    </>
  );
}
