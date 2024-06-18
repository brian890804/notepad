import * as React from "react";
import { setLanguage } from "../../../i18n/Metronici18n";
import LanguageItem from "./LanguageItem";

import styled from "@emotion/styled/macro";
import { colors } from "../../../constants";
export default function LanguageListItem({ list, currentLanguage }) {
  const [selectedValue, setSelectedValue] = React.useState(
    currentLanguage?.lang
  );
  const handleChange = (event) => {
    setLanguage(event.target.value);
    setSelectedValue(event.target.value);
  };
  const handleClick = (event) => {
    setLanguage(event);
    setSelectedValue(event);
  };
  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "size-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  return (
    <LanguageListItemElement>
      {list.map((data) => (
        <LanguageItem
          key={data?.lang}
          controlProps={controlProps}
          data={data}
          handleClick={handleClick}
        />
      ))}
    </LanguageListItemElement>
  );
}

export const LanguageListItemElement = styled.div`
  /*  */
  padding: 0 1%;
  .container {
    display: flex;
    width: 100%;
    padding: 1% 0;
    border-bottom: 1px solid #bbb;
    font-size: 20px;
    color: ${colors.text_grey};
    justify-content: space-between;
    align-items: center;

    .left {
      float: left;
    }
    .right {
      float: right;
    }
  }
`;
