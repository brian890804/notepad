import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import TopBarContainer, { main_height } from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";

import fireIcon from "../../assets/icons/fire.svg";
import { colors, padding } from "../../constants";
import useMediaSetting from "../../reackHook/useMediaSetting";

function SocialSelectLocal({ getSocialLOCAL, clickCitySearch }) {
  const intl = useIntl();
  const { size } = useMediaSetting();
  const { width } = size;

  const [hotLocal, setHotData] = useState([]);
  const [letterLocalData, setLetterLocalData] = useState({});

  useEffect(() => {
    getSocialLOCAL((data) => {
      setHotData(
        data.filter((data) => {
          return data.ishot;
        })
      );
      let letterObjectArray = {};
      for (let i = 0; i < data.length; i++) {
        if (!letterObjectArray[data[i].pinyin[0]])
          letterObjectArray[data[i].pinyin[0]] = [];
        letterObjectArray[data[i].pinyin[0]].push(data[i]);
      }
      setLetterLocalData(letterObjectArray);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function scrollToEvent(key) {
    window.scrollTo({
      top: document.getElementById(key).offsetTop - main_height - 10,
      left: 0,
      behavior: "smooth",
    });
  }

  function clickCity(city, cityId) {
    clickCitySearch(city, cityId);
  }

  return (
    <SocialSelectLocalElement>
      <TopBarContainer>
        <TopTitleBar
          title={intl.formatMessage({
            id: "SOCIAL.SELECTION.LOCAL.LABEL.CITY.SWITCH",
          })}
          showBack={true}
          show_back_color="#fff"
        />
      </TopBarContainer>
      <div className="hot_city">
        <div className="hot_city_title">
          <img className="hot_city_title_icon" src={fireIcon} alt="hot title" />
          <span className="hot_city_title_text">
            {intl.formatMessage({
              id: "SOCIAL.SELECTION.LOCAL.LABEL.CITY.POPULAR",
            })}
          </span>
        </div>
        <div className="hot_city_category">
          <div className="hot_city_category_item">
            <div
              className="hot_city_category_item_content"
              onClick={() => {
                clickCity("全部");
              }}
            >
              {intl.formatMessage({ id: "SOCIAL.SELECTION.LOCAL.LABEL.ALL" })}
            </div>
          </div>
          {hotLocal.map((data) => {
            return (
              <div
                className="hot_city_category_item"
                key={data.name}
                onClick={() => {
                  clickCity(data.name, data.id);
                }}
              >
                <div className="hot_city_category_item_content">
                  {data.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="city_nav"
        style={{
          transform:
            "translateY(-50%) translateX(50%) translateX(" +
            width * 0.46 +
            "px)",
        }}
      >
        {Object.keys(letterLocalData).map((key) => {
          return (
            <div
              className="city_nav_letter"
              onClick={() => {
                scrollToEvent(key);
              }}
              key={key}
            >
              {key}
            </div>
          );
        })}
      </div>

      <div className="select_city">
        {Object.keys(letterLocalData).map((key) => {
          return (
            <div className="select_city_container" key={key}>
              <div id={key} className="select_city_container_title">
                {key}
              </div>
              {letterLocalData[key].map((data) => {
                return (
                  <div
                    className="select_city_container_city"
                    onClick={() => {
                      clickCity(data.name, data.id);
                    }}
                    key={data.name}
                  >
                    {data.name}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </SocialSelectLocalElement>
  );
}

export default SocialSelectLocal;

const SocialSelectLocalElement = styled.div`
  /*  */
  padding-top: ${main_height}px;

  .hot_city {
    padding: ${padding}px;

    &_title {
      display: flex;
      align-items: center;

      &_icon {
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }

      &_text {
        margin-left: 6px;
        font-size: 14px;
        font-weight: 700;
      }
    }

    &_category {
      display: flex;
      margin-top: 10px;
      flex-wrap: wrap;

      &_item {
        padding: 10px;
        box-sizing: border-box;
        width: 33.3333%;

        &_content {
          cursor: pointer;
          padding: 10px 0;
          text-align: center;
          background-color: ${colors.back_grey};
          border-radius: 10px;
        }
      }
    }
  }

  .city_nav {
    position: fixed;
    top: 55%;
    right: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;

    &_letter {
      cursor: pointer;
      padding: 8px;
    }
  }

  .select_city {
    padding: ${padding}px;

    &_container {
      &_title,
      &_city {
        padding: 10px 5px;
      }

      &_title {
        background-color: ${colors.back_grey};
      }

      &_city {
        cursor: pointer;
      }
    }
  }
`;
