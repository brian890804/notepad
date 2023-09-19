import React from "react";
import styled from "@emotion/styled";
import { alpha, styled as muiStyle } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { colors, titleFontSize } from "../../constant";
import { FormHelperText } from "@mui/material";
interface StyleProps {
  textalign?: string;
  hastitle?: boolean;
  hastips?: boolean;
}
const BootstrapInput = muiStyle(InputBase)<StyleProps>(
  ({ theme, textalign, hastitle, disabled }) => ({
    "label + &": {
      marginTop: hastitle && theme.spacing(3),
    },

    "& .MuiInputBase-input": {
      // marginBottom: hastitle && !disabled && "1.5em",
      borderRadius: 4,
      position: "relative",
      backgroundColor:
        theme.palette.mode === "light" ? colors.background_gray : "#2b2b2b",
      border: "1px solid #ced4da",
      fontSize: "1.2rem",
      padding: "10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      textAlign: textalign || "start",
      // Use the system font instead of the default Roboto font.
      "&:focus": {
        borderRadius: 4,
        boxShadow: `${alpha("#5c5c5c", 0.25)} 0 0 0 0.2rem`,
        borderColor: "#5c5c5c",
      },
    },
  })
);
type Props = {
  title?: string | "";
  value?: number | string;
  textalign?: string;
  disabled?: boolean;
  placeholder?: string;
  field?: any;
  form?: any;
  item?: any;
};
const InputText: React.FC<Props> = ({
  title = "",
  value,
  textalign,
  disabled,
  placeholder,
  item,
  field, //name onchange
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const errors = form?.errors;
  const touched = form?.touched;
  const hastips =
    errors && errors[field?.name] && touched && touched[field?.name];
  return (
    <InputTextElement hastips={hastips}>
      <FormControl variant="standard" fullWidth>
        <InputLabel shrink htmlFor="bootstrap-input">
          {title}
        </InputLabel>
        <BootstrapInput
          hastitle={title !== "" ? 1 : 0}
          disabled={disabled}
          id="bootstrap-input"
          textalign={textalign && textalign}
          placeholder={placeholder}
          value={value && value} //这个删了身高会坏
          hastips={hastips}
          {...field}
          {...props}
        />
        {!disabled && (
          <FormHelperText id="component-error-text" className="error_tip">
            {hastips ? errors[field?.name] : <div>&nbsp;</div>}
          </FormHelperText>
        )}
      </FormControl>
    </InputTextElement>
  );
};

export default InputText;

const InputTextElement = styled.div<StyleProps>`
  /*  */
  .MuiInputLabel-root {
    font-size: ${titleFontSize};
    transform: none;
    margin-bottom: 5em;
    color: black;
    &.Mui-focused {
      font-weight: 600;
    }
  }
  .Mui-disabled {
    -webkit-text-fill-color: black !important;
  }
  .error_tip {
    color: ${colors.back_dark_pink};
  }
`;
