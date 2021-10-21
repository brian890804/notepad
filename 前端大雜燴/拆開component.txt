import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  outSidePosition: {
    position: "relative",
  },
  inSidePosition: {
    position: "absolute",
    top: "-2.48px",
    right: "0px",
  },
}));

const getHelperText = (touched, errors) => {
  if (touched && errors) {
    return errors;
  }
};

export function MaterialInput({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  type,
  ...props
}) {
  const classes = useStyles();

  return (
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      label={label}
      type={type}
      error={touched[field.name] && errors[field.name]}
      helperText={getHelperText(touched[field.name], errors[field.name])}
      {...field}
      {...props}
    />
  );
}
