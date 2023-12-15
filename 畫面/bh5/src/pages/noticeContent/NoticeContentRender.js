import React, { useEffect } from "react";
import styled from "@emotion/styled/macro";
import PropTypes from "prop-types";

import TopBarContainer, { main_height } from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";

const NotiveContentPage = ({
    title, 
    noticeId,
    content,
    readNotice,
  }) => {

  useEffect(()=>{
    readNotice(noticeId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <NotiveContentPageElement>
      <TopBarContainer>
        <TopTitleBar
          title={title}
          showBack={true}
          show_back_color="#ffffff"
        />
      </TopBarContainer>
      <div 
        className="content px-indent15"
        dangerouslySetInnerHTML={{
          __html: content
        }}
      />
    </NotiveContentPageElement>
  )
}

NotiveContentPage.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  noticeId: PropTypes.number
}

export default NotiveContentPage;

export const NotiveContentPageElement = styled.div`/*  */
padding: 2px;
padding-top: ${main_height + 2}px;

.px-indent15{
  padding-left:15%;
  padding-right:15%;
}
.content {
  p {
    margin-top: 18px;
    font-size: 22px;
    font-weight: 900;
  }

  a {
    text-decoration: underline;
    color: #00f;
  }

  img {
    width: 100%;
    height: auto;
    vertical-align: middle;
  }
}
`;