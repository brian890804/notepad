import * as React from "react";
import styled from "@emotion/styled";
import { alpha, styled as MuiStyle } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import InputBase from "@mui/material/InputBase";
import { colors, titleFontSize } from "../../constant";
import { FormHelperText } from "@mui/material";

const BootstrapInput = MuiStyle(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor:
      theme.palette.mode === "light" ? colors.background_gray : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: "1.2rem",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    "&:focus": {
      borderRadius: 4,
      fontWeight: "500",
      borderColor: "#5c5c5c",
      boxShadow: `${alpha("#5c5c5c", 0.25)} 0 0 0 0.2rem`,
    },
  },
}));
type Props = {
  SelectData: {
    name: string;
    label: string;
    options: Array<optionsProps | any>;
    nowSelect: number;
  };
  setControl: any;
  field?: any;
  name?: string;
  form?: any;
};
type optionsProps = {
  value?: string | number;
  name?: string;
};

const SelectText: React.FC<Props> = ({
  SelectData,
  setControl,
  field,
  form,
  ...props
}) => {
  const [option, setOption] = React.useState("");
  const errors = form?.errors;
  const touched = form?.touched;
  const hasTips =
    errors && errors[field?.name] && touched && touched[field?.name];
  // const handleChange = (event: { target: { value: string } }) => {
  //formik接管 這邊沒用
  //   setOption(event.target.value);
  //   if (SelectData.label === "性別") {
  //     setControl(SelectData.label, Number(event.target.value));
  //   } else {
  //     setControl(SelectData.label, event.target.value);
  //   }
  // };

  return (
    <SelectTextElement>
      <FormControl variant="standard" fullWidth>
        <InputLabel htmlFor="demo-customized-select-native">
          {SelectData.label}
        </InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={option}
          // onChange={handleChange}
          input={<BootstrapInput />}
          {...field}
          {...props}
        >
          <option aria-label="None" value={0}>
            請選擇
          </option>
          {SelectData.name == "shape"
            ? SelectData.options.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))
            : SelectData.options.map((item) => (
                <option value={item.id} key={item.name}>
                  {item.name}
                </option>
              ))}
        </NativeSelect>
        <FormHelperText id="component-error-text" className="error_tip">
          {hasTips ? errors[field?.name] : <div>&nbsp;</div>}
        </FormHelperText>
      </FormControl>
    </SelectTextElement>
  );
};
export default SelectText;

const SelectTextElement = styled.div`
  /*  */
  .MuiInputLabel-root {
    transform: none;
    font-size: ${titleFontSize};
    color: black;
    &.Mui-focused {
      font-weight: 600;
    }
  }
  .MuiNativeSelect-icon {
    display: flex;
  }
  select option {
    background: #a8a8a8 !important;
    color: #646464 !important;
    box-shadow: 0 0 10px 100px #1882a8 inset !important;
  }

  .error_tip {
    color: ${colors.back_dark_pink};
  }
`;
