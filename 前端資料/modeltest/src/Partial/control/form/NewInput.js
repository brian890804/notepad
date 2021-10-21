import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CopyButton } from "./CopyButton";
import { FieldFeedbackLabel } from "./FieldFeedbackLabel";

const useStyles = makeStyles((theme) => ({
  outSidePosition: {
    position: "relative"
  },
  inSidePosition: {
    position: "absolute",
    top: "-2.48px",
    right: "0px",
  },
}));

const getFieldCSSClasses = (touched, errors) => {
  const classes = ["form-control"];
  if (touched && errors) {
    classes.push("is-invalid");
  }

  if (touched && !errors) {
    classes.push("is-valid");
  }

  return classes.join(" ");
};

export function NewInput({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel = true,
  customFeedbackLabel,
  type = "text",
  copyButton = false,
  enable,
  ...props
}) {
  const classes = useStyles();

  return (
    <>
      {label && <label>{label}</label>}
      <div
        className={copyButton ? classes.outSidePosition : null}
      >
        <input
          type={type}
          className={getFieldCSSClasses(touched[field.name], errors[field.name])}
          style={{ minWidth: "100%" }}
          onKeyPress={(e) => {
            if (enable && !errors[field.name]) {
              if (e.charCode === 13 && props.action) {
                props.action(field.value)
              }

            }
          }}

          {...field}
          {...props}
        />
        {copyButton ?
          <div
            className={classes.inSidePosition}
          >
            <CopyButton value={props.value ? props.value : field.value} />
          </div>

          : null}
      </div>



      {withFeedbackLabel && (
        <FieldFeedbackLabel
          error={errors[field.name]}
          touched={touched[field.name]}
          label={label}
          type={type}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
}
