import { connect } from "react-redux";
import styled from "@emotion/styled/macro";
import ImageComponent from "./ImageComponent";
import heartIcon from "../../assets/icons/heart.svg";
import { checkinPageConditioncheckAction } from "../../reducers/actions/utilities";
import { colors } from "../../constants";

const PictureCard = ({ data, toPhotosPage, total_view_show }) => {
  function clickPictureCard() {
    toPhotosPage(data);
  }

  return (
    <PictureCardElement onClick={clickPictureCard}>
      <div className="card">
        <div className="card_header">
          <ImageComponent
            cover
            is_cover={true}
            src={data.img}
            alt={data.title}
            title={data.title}
            height={100}
            border_radius={0}
            total_view_show={total_view_show}
            total_view={data.fake_total_view}
          />
        </div>
        <div className="card_body">
          <div className="card_body_title">{data.title}</div>
          <div className="card_body_heart">
            <img className="card_body_heart_img" src={heartIcon} alt="heart" />
            {data.need_jinbi}金币
          </div>
        </div>
      </div>
    </PictureCardElement>
  );
};

const PictureCardStateToProps = (state, ownProps) => {
  return {
    data: ownProps.data,
  };
};

const PictureCardDispatch = (dispatch) => {
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
  PictureCardStateToProps,
  PictureCardDispatch
)(PictureCard);

export const PictureCardElement = styled.div`
  /*  */
  &:hover {
    color: ${colors.back_dark_pink};
    box-shadow: 0 0 7px 0 rgba(250, 113, 154, 0.84);
    border-radius: 5%;
  }

  box-sizing: border-box;

  .card {
    cursor: pointer;
    overflow: hidden;
    border: 1px solid rgb(0 0 0 / 20%);
    border-radius: 10px;

    &_body {
      padding: 5px;

      &_title {
        overflow: hidden;
        height: ${2.5 * 18}px;
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
