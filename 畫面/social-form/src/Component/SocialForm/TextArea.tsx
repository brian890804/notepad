import React from "react";
import { FormHelperText } from "@mui/material";
import styled from "@emotion/styled";
import { colors, titleFontSize } from "../../constant";
interface StyleProps {
  wordsCount: number;
}
const style = {
  display: "flex",
  justifyContent: "start",
  flexWrap: "wrap",
  fontSize: titleFontSize,
};
type Props = {
  onChange: (props: any) => void;
  placeholder?: string;
  form?: any;
  field?: any;
};
const TextArea: React.FC<Props> = ({ onChange, placeholder, form, field }) => {
  const [wordsCount, setWordsCount] = React.useState(0);
  const onChangeEvent = (e: any) => {
    onChange(e);
    setWordsCount(e.length);
  };
  const errors = form?.errors;
  const touched = form?.touched;
  const hasTips =
    errors && errors[field?.name] && touched && touched[field?.name];
  return (
    <TextAreaElement wordsCount={wordsCount}>
      <div style={style as React.CSSProperties}>
        关于我
        <div className="container">
          <textarea
            style={{ width: "100%" }}
            placeholder={placeholder}
            cols={50}
            rows={5}
            wrap="virtual"
            onChange={(e) => onChangeEvent(e.target.value)}
          />
          <div className="tip_font_length"> {wordsCount}/30</div>
        </div>
        <FormHelperText
          id="component-error-text"
          style={{ color: colors.back_dark_pink }}
        >
          {hasTips ? errors[field?.name] : <div>&nbsp;</div>}
        </FormHelperText>
      </div>
    </TextAreaElement>
  );
};

export default TextArea;

const TextAreaElement = styled.div<StyleProps>`
  /*  */
  .container {
    display: flex;
    width: 100%;
    position: relative;
    padding: 0;
    margin: 0;
  }
  .tip_font_length {
    position: absolute;
    bottom: 5px;
    right: 15px;
    color: ${({ wordsCount }: any) =>
      wordsCount > 30 ? "red" : colors.text_grey};
  }
`;
