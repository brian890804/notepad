import { useRef } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import PropTypes from "prop-types";

import TopBarContainer, { main_height } from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";

import NoticeListCard from "./component/NoticeListCard";
import { pageUrlConstants } from "../../constants";

const { notice } = pageUrlConstants;

const { noticeContent } = notice.pages;

const NoticeListPage = ({ noticeList }) => {
  const intl = useIntl();

  const root = useRef(null);

  return (
    <NoticeListPageElement ref={root}>
      <TopBarContainer>
        <TopTitleBar
          title={intl.formatMessage({ id: "NOTICE.NEWS" })}
          showBack={true}
          show_back_color="#ffffff"
        />
      </TopBarContainer>
      <div className="notice_container fw-m">
        {noticeList.map((data) => {
          return (
            <NoticeListCard
              title={data.title}
              isNew={data.isNew}
              root={root}
              key={data.id}
              routes={{
                name: noticeContent.name + data.title,
                path: noticeContent.path,
                dynamic: {
                  noticeId: data.id,
                },
              }}
            />
          );
        })}
      </div>
    </NoticeListPageElement>
  );
};

NoticeListPage.propTypes = {
  noticeList: PropTypes.array,
};

export default NoticeListPage;

const NoticeListPageElement = styled.div`
  /*  */
  padding-top: ${main_height}px;

  /* .notice_container {
  margin-top: 5px;
} */
`;

export { NoticeListPageElement };
