import { useEffect } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import TopBarContainer, { main_height } from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import styles from "./ProfileMyorderRender.module.scss";
import ImageComponent from "../component/ImageComponent";
import cx from "classnames";
import LinkComponent from "../component/LinkComponent";
import { apiUrl, pageUrlConstants } from "../../constants";
const { profile } = pageUrlConstants;
const ProfileMyorder = ({ myorderData, getMyOrderList }) => {
  const intl = useIntl();
  useEffect(() => {
    if (myorderData.list.length === 0) {
      getMyOrderList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProfileMyorderElement>
      <TopBarContainer>
        <TopTitleBar
          title={intl.formatMessage({ id: "PROFILE.MY.ORDER.MALL.ORDER" })}
          show_back_color="#ffffff"
          showBack={true}
        />
      </TopBarContainer>
      <div className={styles.myorder_container}>
        {myorderData.list.map((data) => {
          return (
            <LinkComponent
              className={styles.myorder_container_item}
              routes={{
                name:
                 profile.pages.profileMyorderDetail.name +
                  data.title,
                path: profile.pages.profileMyorderDetail.path,
                dynamic: {
                  orderId: data.oderid,
                },
              }}
              key={data.oderid}
            >
              <div className={styles.myorder_container_item_cover}>
                <ImageComponent
                  className={styles.myorder_container_item_cover_img}
                  src={
                    data.picurl.indexOf("http") === -1
                      ? apiUrl + data.picurl
                      : data.picurl
                  }
                  alt={data.title}
                  title={data.title}
                  border_radius="0"
                />
              </div>
              <div className={styles.myorder_container_item_info}>
                <h3 className={styles.myorder_container_item_info_title}>
                  {data.title}
                </h3>
                <p className={styles.myorder_container_item_info_price}>
                  {~~data.amount}{" "}
                  {data.paytype
                    ? intl.formatMessage({ id: "GLOBAL.GOLD_MONEY" })
                    : intl.formatMessage({ id: "GLOBAL.MONEY" })}
                </p>
                <p
                  className={cx(styles.myorder_container_item_info_state, {
                    [styles.done]:
                      data.fahuoxinxi ===
                        intl.formatMessage({
                          id: "PROFILE.MY.ORDER.SUCCESS",
                        }) || data.order_type !== "actual",
                  })}
                >
                  {data.order_type === "actual"
                    ? data.fahuoxinxi
                    : intl.formatMessage({ id: "PROFILE.MY.ORDER.SUCCESS" })}
                </p>
              </div>
            </LinkComponent>
          );
        })}
      </div>
    </ProfileMyorderElement>
  );
};

export default ProfileMyorder;

export const ProfileMyorderElement = styled.div`
  /*  */
  padding-top: ${main_height}px;
`;
