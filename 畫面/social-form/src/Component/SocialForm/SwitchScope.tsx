import React, { useState, useRef, useEffect } from "react";
import { alpha } from "@mui/material/styles";
import styled from "@emotion/styled";
import InputText from "./InputText";
import { colors, titleFontSize } from "../../constant";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
type Props = {
  title?: string;
  onChange: (e: number) => void;
};
const SwitchText: React.FC<Props> = ({ title,onChange }) => {
  const myInterval = useRef<any>();
  const [nowNumber, setNowNumber] = useState<number>(150);

  useEffect(() => {
    onChange(nowNumber);
  }, [nowNumber]);
  function add() {
    clearInterval(myInterval.current);
    setNowNumber((pre) => (pre += 1));
    myInterval.current = setInterval(() => {
      setNowNumber((pre) => (pre += 1));
    }, 100);
  }

  function reduce() {
    clearInterval(myInterval.current);
    setNowNumber((pre) => (pre -= 1));
    myInterval.current = setInterval(() => {
      setNowNumber((pre) => (pre -= 1));
    }, 100);
  }
  function mouseUp() {
    clearInterval(myInterval.current);
  }
  return (
    <SwitchTextElement>
      <FormControl variant="standard" fullWidth>
        <InputLabel shrink htmlFor="bootstrap-input">
          {title}
        </InputLabel>
        <label className="container">
          <div className="effect">
            <Button
              className="effect_button"
              variant="text"
              onMouseDown={reduce}
              onMouseUp={mouseUp}
              onTouchStart={reduce}
              onTouchEnd={mouseUp}
              onMouseLeave={mouseUp}
            >
              -
            </Button>
          </div>
          <div style={{ width: "100%", height: "100%" }}>
            <InputText
              value={nowNumber + " cm"}
              textalign={"center"}
              disabled
            />
          </div>
          <div className="effect">
            <Button
              className="effect_button"
              variant="text"
              onMouseUp={mouseUp}
              onMouseDown={add}
              onTouchStart={add}
              onTouchEnd={mouseUp}
              onMouseLeave={mouseUp}
            >
              +
            </Button>
          </div>
        </label>
      </FormControl>
    </SwitchTextElement>
  );
};

export default SwitchText;
const SwitchTextElement = styled.div`
  /*  */
  padding-bottom: 1.5em;
  .container {
    margin-top: 1.4em;
    display: flex;
    align-items: self-end;
    width: 100%;
    gap: 0.5em;
  }
  .MuiInputLabel-root {
    transform: none;
    font-size: ${titleFontSize};
    color: black;
    &.Mui-focused {
      font-weight: 600;
    }
  }
  .effect {
    font-size: 1rem;
    line-height: 1.4375em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    &_button {
      user-select: none;
      cursor: pointer;
      color: ${colors.text_grey};
      line-height: 1.8rem;
      font-size: 3rem;
      background-color: ${colors.background_gray};
      padding: 10px 12px;

      &:hover {
        background-color: ${colors.background_gray};
        border-radius: 4;
        box-shadow: ${alpha("#5c5c5c", 0.25)} 0 0 0 0.2rem;
        border-color: "#5c5c5c";
      }
    }
  }
`;
