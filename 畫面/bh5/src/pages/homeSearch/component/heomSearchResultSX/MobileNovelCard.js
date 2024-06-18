import { connect } from "react-redux";
import styled from "@emotion/styled/macro";
import { colors } from "../../../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import { side_padding } from "../../../../constants";
import { checkinPageConditioncheckAction } from "../../../../reducers/actions/utilities";

function MobileNovelCard({ data, border, toNovelPage }) {
  function clickNovelCard() {
    toNovelPage(data);
  }
  return (
    <NovelCardElement onClick={clickNovelCard} border={border}>
      <div className="box">
        <div className="item">
          <div className="item_left">
            <div className="card_header mb-3">
              <div className="card_header">
                <h6 className="card_header_title ">{data.title}</h6>
                <div className="card_header_title_price ml-2">
                  {data.need_jinbi}金币
                </div>
              </div>
            </div>
          </div>
          <div className="card_body_time fw-s">{data.createtime}</div>
        </div>
        <div className="item_right">
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
    </NovelCardElement>
  );
}
const NovelCardStateToProps = (state, ownProps) => {
  return {
    data: ownProps.data,
    border: ownProps.border,
  };
};

const NovelCardDispatch = (dispatch) => {
  return {
    toNovelPage: (data) => {
      dispatch(
        checkinPageConditioncheckAction({
          itemId: data.id,
          itemType: 0,
          needGold: data.need_jinbi,
        })
      );
    },
  };
};
export const NovelCardElement = styled.div`
  /*  */
  padding: ${side_padding}px;
  border-bottom: border-box;
  border-bottom: ${({ border }) => border && "1px solid #aaa"};
  .box {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .item {
    &_right {
      align-self: center;
    }
  }
  .card {
    cursor: pointer;
    padding: 5px;

    &_header {
      display: flex;
      justify-content: space-between;
      &_title {
        overflow: hidden;
        font-size: 16px;
        font-weight: 600;

        &_price {
          background-image: linear-gradient(
            to bottom,
            #fa83b3,
            #f45c8c 55%,
            #f24c7c
          );
          border-radius: 5px;
          padding: 4px 8px;
          font-size: 12px;
          color: #fff;
        }
      }
    }

    &_body_time {
      margin-top: 5px;
      color: ${colors.text_grey};
    }
  }
`;

export default connect(
  NovelCardStateToProps,
  NovelCardDispatch
)(MobileNovelCard);
