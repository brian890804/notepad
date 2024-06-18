import React, { useState } from "react";
import Draggable from "react-draggable";
import { connect, useDispatch } from "react-redux";
import styled from "@emotion/styled/macro";
import { CSSTransition } from "react-transition-group";
import { capsuleUrl, pageUrlConstants } from "../../../constants";
import useMediaSetting from "../../../reackHook/useMediaSetting";
import CloseComponent, {
  CloseComponentElement,
} from "../../component/CloseComponent";
import LinkComponent from "../../component/LinkComponent";
import { pushRoutes } from "../../../reducers/actions/historyActions";
const { login } = pageUrlConstants;
const DraggableComponent = ({
  slide_height,
  position_style,
  css_in,
  direct_route,
  key,
  user,
  children,
  type,
  onClick,
}) => {
  const { isMobile } = useMediaSetting();
  const [show, setShow] = useState(true);
  const [drag, setDrag] = useState(false);
  const [mobileDrag, setMobileDrag] = useState(false);
  const dispatch = useDispatch();
  function onTouchMobile() {
    if (isMobile) {
      mobileDrag
        ? setMobileDrag(false)
        : user.id === "guest"
        ? window.location.assign(pageUrlConstants.login.pages.loginMain.path)
        : window.open(direct_route);
    }
  }
  function onTouchClick() {
    if (mobileDrag) {
      setMobileDrag(false);
    } else if (user.id == "guest") {
      dispatch(pushRoutes(login));
    } else {
      onClick();
    }
  }
  return (
    <DraggableComponentElement
      show={show}
      drag={drag}
      isMobile={isMobile}
      slide_height={slide_height}
      position_style={position_style}
    >
      <CSSTransition
        timeout={200}
        in={css_in}
        classNames="CSSTransition_opacity"
        unmountOnExit
        key={key}
      >
        <Draggable
          onDrag={() => {
            setDrag(true);
            setMobileDrag(true);
          }}
          onStop={() => {
            setDrag(false);
          }}
        >
          <div className="capsule_container">
            <CloseComponent
              callback={() => {
                setShow(false);
              }}
              styleType={0}
            />
            {type === "capsule" ? (
              <div onTouchEndCapture={onTouchMobile}>
                <LinkComponent
                  className="capsule_container_link"
                  routes={
                    user.id === "guest"
                      ? pageUrlConstants.login.pages.loginMain
                      : {
                          linkurl:
                            capsuleUrl +
                            "?id=" +
                            user.id +
                            "&free=" +
                            user.free_gashapon,
                        }
                  }
                >
                  {children}
                </LinkComponent>
              </div>
            ) : (
              <div onTouchEndCapture={onTouchClick} onClick={onTouchClick}>
                {children}
              </div>
            )}
          </div>
        </Draggable>
      </CSSTransition>
    </DraggableComponentElement>
  );
};

const DraggableComponentElement = styled.div`
  /*  */
  display: ${({ show }) => (!show ? "none" : "auto")};
  .capsule_container {
    position: fixed;
    top: auto;
    left: ${({ position_style }) => position_style.left};
    bottom: ${({ position_style }) => position_style.bottom};
    right: ${({ position_style }) => position_style.right};
    z-index: 10;
    &_link {
      pointer-events: ${({ drag }) => (drag ? "none" : "auto")};
      &_img {
        width: 70px;
      }
    }
    ${CloseComponentElement} {
      position: absolute;
      top: -5px;
      right: 0;
      width: 25px;
      height: 25px;
    }
  }
`;
const DraggableComponentToProps = (state, ownProps) => {
  let newNotice = 0;
  let noticeList = state.noticeList || [];
  let noticeListRead = state.noticeListRead || [];
  for (let i = 0; i < noticeList.length; i++) {
    if (noticeListRead.indexOf(noticeList[i].id) === -1) {
      newNotice++;
    }
  }
  return {
    config: state.config,
    user: state.user,
    slide_height: ownProps.slide_height,
    position_style: ownProps.position_style,
    css_in: ownProps.css_in,
    children: ownProps.children,
    key: ownProps.key,
    direct_route: ownProps.direct_route,
    type: ownProps.type,
    onClick: ownProps.onClick,
  };
};

const TopSearchBarDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  DraggableComponentToProps,
  TopSearchBarDispatchToProps
)(DraggableComponent);
