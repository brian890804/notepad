import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import TopBarContainer, { sub_height } from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import VendorItemCard from "../vendorMain/component/VendorGameItemCard";
import { colors, side_padding } from "../../constants";
import scrollBottomCallEvent from "../../modules/scrollEvent";
import useMediaSetting from "../../reackHook/useMediaSetting";
import dropdownIcon from "../../assets/icons/dropdown.svg";

function VendorCategory({
  vendorListData,
  vendorCategoryId,
  vendorCategoryTitle,
  updateVendorList,
  resetGameListData,
}) {
  const { isMobile } = useMediaSetting();
  const intl = useIntl();
  const [typeSelect, setTypeSelect] = useState(0);

  useEffect(() => {
    window.removeEventListener("scroll", scrollEvent);
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeSelect]);

  useEffect(() => {
    resetGameListData(typeSelect);
    updateVendorList(typeSelect, vendorCategoryId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeSelect, isMobile]);

  function scrollEvent(e) {
    scrollBottomCallEvent((scrollColdEnd) => {
      updateVendorList(typeSelect, vendorCategoryId, scrollColdEnd);
    });
  }

  function onChangeType(e) {
    if (Number(e.target.value) !== typeSelect) {
      setTypeSelect(Number(e.target.value));
    }
  }
  return (
    <VendorCategoryElement>
      <TopBarContainer>
        <TopTitleBar
          title={vendorCategoryTitle}
          showBack={true}
          show_back_color="#ffffff"
        />
      </TopBarContainer>
      <div className="vendor_container ">
        <p className="vendor_container_title pt-3">
          <select onChange={onChangeType}>
            <option value={0}>
              {intl.formatMessage({ id: "GAME.LABEL.ALL_GAME" })}
            </option>
            <option value={1}>
              {intl.formatMessage({ id: "GAME.LABEL.PC_GAME" })}
            </option>
            <option value={2}>
              {intl.formatMessage({ id: "GAME.LABEL.ANDROID_GAME" })}
            </option>
          </select>
        </p>
        {isMobile ? (
          <MobileContent vendorListData={vendorListData} />
        ) : (
          <WebContent vendorListData={vendorListData} />
        )}
      </div>
    </VendorCategoryElement>
  );
}

const WebContent = ({ vendorListData }) => {
  return (
    <div className="vendor_container_content">
      {vendorListData?.map((data) => (
        <div className="vendor_container_content_col" key={data.id}>
          <VendorItemCard data={data} />
        </div>
      ))}
    </div>
  );
};

const MobileContent = ({ vendorListData }) => {
  return (
    <div className="vendor_container_content">
      {vendorListData?.map((data, index) => {
        return (
          <div className="vendor_container_content_col" key={index}>
            <VendorItemCard data={data} key={data.id} />
          </div>
        );
      })}
    </div>
  );
};

export default VendorCategory;

const VendorCategoryElement = styled.div`
  /*  */
  padding-top: ${sub_height}px;
  .vendor_container {
    @media (min-width: 899px) {
      padding: 0 10px;
    }
    &_title {
      margin-top: 20px;
      font-weight: 900;
      display: flex;
      justify-content: center;
      select {
        appearance: none;
        background: url(${dropdownIcon}) no-repeat;
        background-size: 20px 20px;
        background-position: right center;
        border-radius: 24px;
        border: solid 1px ${colors.text_light_grey};
        color: ${colors.text_light_grey};
        background-color: #fff;
        font-size: 16px;
        padding: 10px 30px;
        background-position-x: 95%;
        width: 80%;
        text-align: center;
        @media (min-width: 899px) {
          background-position-x: 99%;
        }
      }
    }

    &_content {
      display: flex;
      flex-wrap: wrap;
      @media (min-width: 899px) {
        flex-direction: row;
      }

      &_col {
        padding: 1px 5px;
        box-sizing: border-box;
        width: 50%;
        @media (min-width: 899px) {
          padding: ${side_padding}px;
          width: calc(100% / 6);
          break-inside: avoid;
        }
      }
    }
  }
`;
