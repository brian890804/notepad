import React from "react";
import styled from "@emotion/styled/macro";

import demonFly from "../../../assets/start/demonfly.gif";

const LoadingContent = ({ loadingStr }) => {
  return (
    <LoadingContentElement>
      <div className="demon">
        <img className="demon_img" src={demonFly} alt="loading demon" />
      </div>
      <div className="loading">
        <div className="loading_description">{loadingStr}...</div>
        <div className="loading_loading">Loading...</div>
      </div>
    </LoadingContentElement>
  );
};

export default LoadingContent;

const LoadingContentElement = styled.div`/*  */
display: flex;
padding: 10px;
background-color: #999c;
border-radius: 8px;

.demon {
  margin-right: 10px;
  width: 40px;

  &_img {
    width: 100%;
    vertical-align: middle;
  }
}

.loading {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  white-space: nowrap;
  color: #fff;
}
`;

export { LoadingContentElement };
