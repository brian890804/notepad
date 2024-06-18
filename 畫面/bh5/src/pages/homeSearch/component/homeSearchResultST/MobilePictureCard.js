import { connect } from "react-redux";
import styled from "@emotion/styled/macro";
import ImageComponent from "../../../component/ImageComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import heartIcon from "../../../../assets/icons/heart.svg";
import { checkinPageConditioncheckAction } from "../../../../reducers/actions/utilities";

function judeFontLength(data) {
  if (data.length >= 20) return data.substr(0, 20) + "...";
  return data;
}
const MobilePictureCard = ({ data, toPhotosPage }) => {
  function clickMobilePictureCardCard() {
    toPhotosPage(data);
  }

  return (
    <MobilePictureCardElement onClick={clickMobilePictureCardCard}>
      <div className="box">
        <div className="item">
          <div className="item_left">
            <div className="card_header">
              <ImageComponent
                src={data.img}
                alt={data.title}
                title={data.title}
                border_radius={0}
                cover={true}
                height={100}
                total_view={data.fake_total_view}
                total_view_show
              />
            </div>
            <div className="card_body">
              <div className="card_body_title">
                {judeFontLength(data.title)}
              </div>
              <div className="card_body_heart">
                <img
                  className="card_body_heart_img"
                  src={heartIcon}
                  alt="heart"
                />
                {data.need_jinbi}金币
              </div>
            </div>
          </div>
        </div>
        <div className="item_right p-1">
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
    </MobilePictureCardElement>
  );
};

const MobilePictureCardStateToProps = (state, ownProps) => {
  return {
    data: ownProps.data,
  };
};

const MobilePictureCardDispatch = (dispatch) => {
  return {
    toPhotosPage: (data) => {
      dispatch(
        checkinPageConditioncheckAction({
          itemId: data.id,
          itemType: 1,
          needGold: data.need_jinbi,
        })
      );
    },
  };
};

export default connect(
  MobilePictureCardStateToProps,
  MobilePictureCardDispatch
)(MobilePictureCard);

export const MobilePictureCardElement = styled.div`
  /*  */
  border: 1px solid rgb(0 0 0 / 20%);
  border-radius: 10px;

  .box {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .item {
    width: 100%;
    &_left {
      display: flex;
    }

    &_right {
      align-self: center;
    }
  }
  .card {
    &_header {
      min-width: 100px;
    }

    &_body {
      padding: 5px;
      align-self: center;

      &_title {
        overflow: hidden;
        height: 2em;
        font-size: 16px;
        font-weight: 600;
      }

      &_heart {
        margin-top: 5px;
        font-size: 14px;
        color: #fa719a;

        &_img {
          margin-right: 5px;
          width: 16px;
          height: 16px;
          vertical-align: bottom;
        }
      }
    }
  }
`;
