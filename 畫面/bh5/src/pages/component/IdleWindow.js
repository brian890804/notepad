import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import style from "@emotion/styled/macro";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaSetting from "../../reackHook/useMediaSetting";
import { useDispatch } from "react-redux";
import { getIdleHomeData } from "../../reducers/actions/utilities";
import CoverCubeItem from "./CoverCubeItem";
import FeaturedCard from "../Games/component/FeaturedCard";
const Title = styled((props) => <DialogTitle {...props} />)(({ theme }) => ({
  "&.MuiDialogTitle-root": {
    fontWeight: "700",
    fontSize: "1.2rem",
  },
}));
const MuiDialog = styled((props) => <Dialog {...props} />)(({}) => ({
  "&.MuiDialog-root": {
    backdropFilter: "blur(6px)",
  },
}));

var mouseTimer;
const IdleWindow = () => {
  const dispatch = useDispatch();
  const { isMobile } = useMediaSetting();
  const [idleMouse, setIdleMouse] = useState(false);
  const [data, setData] = useState({ game_list: [] });

  useEffect(() => {
    if (idleMouse) {
      dispatch(getIdleHomeData()).then((res) => setData(res));
    }
    // 綁定滑鼠移動事件 閒置太久廣告事件
    function mouseMoveEvent() {
      clearTimeout(mouseTimer);
      if (!isMobile && !idleMouse) {
        mouseTimer = setTimeout(() => {
          setIdleMouse(true);
        }, 300000);
      }
    }
    document.addEventListener(
      "mousemove",
      mouseMoveEvent
      // 設定計時器的時間間隔，此處設置為5分鐘（300,000毫秒）
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);
  return (
    <>
      {data.game_list.length ? (
        <MuiDialog
          PaperProps={{ sx: { minWidth: "60vw", overflowY: "inherit" } }}
          open={idleMouse}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <section className="g-flex-space-between">
            <Title id="alert-dialog-title">
              有人在线吗？还有好多绅士内容，继续看下去呀(((o(*ﾟ▽ﾟ*)o)))
            </Title>
            <section style={{ padding: "16px 24px", alignSelf: "center" }}>
              <CloseIcon
                className="mr-2  cursor"
                onClick={() => setIdleMouse(false)}
              />
            </section>
          </section>
          <IdleWindowElement className="g-center gap-3 p-3">
            <section className="idle_left">
              <section className="g-center gap-3 mb-3">
                {data.hot_anime_list.map((anime, index) => (
                  <div
                    style={{ flex: "1 1 50%" }}
                    onClick={() => setIdleMouse(false)}
                    key={index}
                  >
                    <CoverCubeItem
                      data={anime}
                      type={"animated"}
                      disabledPrice
                    />
                  </div>
                ))}
              </section>
              <section className="g-center gap-3">
                {data.hot_comic_list.map((comic, index) => (
                  <div
                    style={{ flex: "0 1 30%" }}
                    onClick={() => setIdleMouse(false)}
                    key={index}
                  >
                    <CoverCubeItem data={comic} type={"comic"} disabledPrice />
                  </div>
                ))}
              </section>
            </section>
            <section className="idle_right">
              <section className="g-center gap-3" style={{ flexWrap: "wrap" }}>
                {data.game_list.map((data, index) => (
                  <div
                    style={{ flex: "0 1 30%" }}
                    onClick={() => setIdleMouse(false)}
                    key={index}
                  >
                    <FeaturedCard data={data} disabledPrice />
                  </div>
                ))}
              </section>
            </section>
          </IdleWindowElement>
        </MuiDialog>
      ) : (
        ""
      )}
    </>
  );
};

export default IdleWindow;

const IdleWindowElement = style.div`
  /*  */
  .idle{
    &_left,
    &_right{
      flex:1 1 50%;
    }
  }
`;
