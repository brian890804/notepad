import React from "react";
import styled from "@emotion/styled/macro";

import err_404 from "../../assets/imgPlaceholder/girl404.png";
import { colors, padding, pageUrlConstants } from "../../constants";
import LinkComponent from "../component/LinkComponent";

const Page404 = () => {
  return (
    <Page404Element>
      <div className="container">
        <div className="container_404">
          <img className="container_404_img" src={err_404} alt="not 404" />
        </div>
        <div className="container_title">
          <p className="container_title_text">Σ( ° △ °|||)</p>
          <p className="container_title_text">你怎么过来的</p>
          <p className="container_title_text">这里什么都没有</p>
        </div>
        <LinkComponent 
          className="container_btn"
          routes={pageUrlConstants.home.pages.homeMain}
        >
          <span className="container_btn_text">快回首页</span>
          <span className="container_btn_text"> (//●⁰౪⁰●)//</span>
        </LinkComponent>
      </div>
    </Page404Element>
  );
};

export default Page404;

export const Page404Element = styled.div`/*  */
  padding: ${padding}px;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;

    &_404 {
      &_img {
        width: 100px;
        vertical-align: middle;
      }
    }

    &_btn,
    &_title {
      margin-top: 10px;
    }

    &_title {
      text-align: center;

      &_text {
        margin-top: 5px;
      }
    }

    &_btn {
      cursor: pointer;
      padding: 10px 30px;
      text-decoration: none;
      color: #fff;
      background-color: ${ colors.dark_pink };
      border-radius: 40px;

      &_text {
        font-weight: 900;
        letter-spacing: 1px;
      }
    }
  }
`;
