import { useEffect } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import TopBarContainer, { main_height } from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import styles from "./ProfileMyorderDetailRender.module.scss";
import ImageComponent from "../component/ImageComponent";
import { apiUrl, pageUrlConstants } from "../../constants";
import cx from "classnames";

import LinkComponent from "../component/LinkComponent";

const ProfileMyorderDetail = ({ goodsId, goodsData, getMyorderDetail }) => {
  const intl = useIntl();
  useEffect(() => {
    getMyorderDetail(goodsId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProfileMyorderDetailElement>
      <TopBarContainer>
        <TopTitleBar
          title={goodsData.title}
          showBack={true}
          color="#000"
          back_color="#fff"
        />
      </TopBarContainer>
      <div className={styles.myorder_detail_container}>
        <div className={styles.myorder_detail_container_info}>
          <div className={styles.myorder_detail_container_info_cover}>
            <ImageComponent
              className={styles.myorder_detail_container_info_cover_img}
              src={
                goodsData.picurl?.indexOf("http") === -1
                  ? apiUrl + goodsData.picurl
                  : goodsData.picurl
              }
              placeholderImg={
                goodsData.picurl?.indexOf("http") === -1
                  ? apiUrl + goodsData.picurl
                  : goodsData.picurl
              }
              alt={goodsData.title}
              title={goodsData.title}
              border_radius="0"
            />
          </div>
          <div className={styles.myorder_detail_container_info_description}>
            <h3
              className={styles.myorder_detail_container_info_description_title}
            >
              {goodsData.title}
            </h3>
          </div>
        </div>
        <div className={styles.myorder_detail_container_price}>
          <div className={styles.myorder_detail_container_price_label}>
            <p className={styles.myorder_detail_container_price_label_text}>
              {intl.formatMessage({ id: "PROFILE.MY.ORDER.DETAIL.TOTAL" })}
            </p>
          </div>
          <div className={styles.myorder_detail_container_price_amount}>
            <p className={styles.myorder_detail_container_price_amount_text}>
              {parseInt(goodsData.amount || 0)}
              <span
                className={
                  styles.myorder_detail_container_price_amount_text_unit
                }
              >
                {goodsData.paytype
                  ? intl.formatMessage({ id: "GLOBAL.GOLD_MONEY" })
                  : intl.formatMessage({ id: "GLOBAL.MONEY" })}
              </span>
            </p>
          </div>
        </div>
        <div className={styles.myorder_detail_container_serial}>
          <div className={styles.myorder_detail_container_serial_label}>
            <p className={styles.myorder_detail_container_serial_label_text}>
              {intl.formatMessage({
                id: "PROFILE.MY.ORDER.DETAIL.REDEEM_CODE",
              })}
            </p>
          </div>
          <div className={styles.myorder_detail_container_serial_amount}>
            <p className={styles.myorder_detail_container_serial_amount_text}>
              {goodsData.gift_status === "1" ? "--" : goodsData.extract_code}
            </p>
          </div>
        </div>
        <div className={styles.myorder_detail_container_state}>
          <div className={styles.myorder_detail_container_state_label}>
            <p className={styles.myorder_detail_container_state_label_text}>
              {intl.formatMessage({ id: "PROFILE.MY.ORDER.DETAIL.STATUS" })}
            </p>
          </div>
          <div className={styles.myorder_detail_container_state_show}>
            <p
              className={cx(styles.myorder_detail_container_state_show_text, {
                [styles.done]:
                  goodsData.fahuoxinxi ===
                    intl.formatMessage({
                      id: "PROFILE.MY.ORDER.DETAIL.SUCCESS",
                    }) || goodsData.order_type !== "actual",
              })}
            >
              {goodsData.order_type === "actual"
                ? goodsData.fahuoxinxi
                : intl.formatMessage({ id: "PROFILE.MY.ORDER.DETAIL.SUCCESS" })}
            </p>
          </div>
        </div>

        {goodsData.order_type === "actual" ? (
          <div className={styles.myorder_detail_container_receiver}>
            <div className={styles.myorder_detail_container_receiver_title}>
              <h3
                className={styles.myorder_detail_container_receiver_title_text}
              >
                {intl.formatMessage({
                  id: "PROFILE.MY.ORDER.DETAIL.RECEIVED_DATA",
                })}
              </h3>
              {goodsData.gift_status === "1" ? (
                <p
                  className={
                    styles.myorder_detail_container_receiver_title_give
                  }
                >
                  {intl.formatMessage({ id: "PROFILE.MY.ORDER.DETAIL.DONATE" })}
                  {goodsData.to_username}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className={styles.myorder_detail_container_receiver_info}>
              <p className={styles.myorder_detail_container_receiver_info_text}>
                {intl.formatMessage({ id: "PROFILE.MY.ORDER.DETAIL.RECEIVED" })}
                {goodsData.username}
              </p>
              <p className={styles.myorder_detail_container_receiver_info_text}>
                {intl.formatMessage({ id: "PROFILE.MY.ORDER.DETAIL.AREA" })}
                {goodsData.area}
              </p>
              <p className={styles.myorder_detail_container_receiver_info_text}>
                {intl.formatMessage({ id: "PROFILE.MY.ORDER.DETAIL.ADDRESS" })}
                {goodsData.address}
              </p>
              <p className={styles.myorder_detail_container_receiver_info_text}>
                {intl.formatMessage({
                  id: "PROFILE.MY.ORDER.DETAIL.POST_CODE",
                })}{" "}
                {goodsData.zip}
              </p>
              <p className={styles.myorder_detail_container_receiver_info_text}>
                {intl.formatMessage({
                  id: "PROFILE.MY.ORDER.DETAIL.CELLPHONE",
                })}
                {goodsData.phone}
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
        {goodsData.order_type !== "actual" ? (
          <div className={styles.myorder_detail_container_submit}>
            {goodsData.gift_status === "1" ? (
              <div
                className={cx(styles.myorder_detail_container_submit_btn, {
                  [styles.disable]: goodsData.gift_status === "1",
                })}
              >
                <span
                  className={styles.myorder_detail_container_submit_btn_text}
                >
                  {intl.formatMessage({ id: "PROFILE.MY.ORDER.DETAIL.DONATE" })}{" "}
                  {goodsData.to_username}
                </span>
              </div>
            ) : (
              <LinkComponent
                className={styles.myorder_detail_container_submit_btn}
                routes={
                  goodsData.order_type === "dianka"
                    ? pageUrlConstants.profile.pages.profileBuyVip.pages
                        .profileBuyVipCommon
                    : {
                        linkurl: goodsData.url,
                      }
                }
              >
                <span
                  className={styles.myorder_detail_container_submit_btn_text}
                >
                  {intl.formatMessage({ id: "PROFILE.MY.ORDER.DETAIL.GO.NOW" })}
                </span>
              </LinkComponent>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </ProfileMyorderDetailElement>
  );
};

export default ProfileMyorderDetail;

export const ProfileMyorderDetailElement = styled.div`
  /*  */
  display: flex;
  flex-direction: column;
  padding-top: ${main_height}px;

  /*  */
  box-sizing: border-box;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
`;
