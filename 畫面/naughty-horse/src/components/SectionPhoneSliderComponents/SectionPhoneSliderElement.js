/* eslint-disable no-useless-computed-key*/
import styled from "@emotion/styled";
const breakpoints = [767, 768];

export const mq = breakpoints.map((bp) => {
  return `@media (${bp === 767 ? "max" : "min"}-width: ${bp}px)`;
});

export const HeaderBar = styled.header({
  zIndex: 10,
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "52px",
  padding: "4px 6.56vw",
  backgroundColor: "rgba(0,0,0,.75)",
  transition: ".3s",
  [".header_bar"]: {
    display: "flex",
    justifyContent: "space-between",
    color: "#fff",
    ["&_logobox"]: {
      ["&_logo"]: {
        transition: ".3s",
        width: "126px",
        verticalAlign: "middle",
      },
    },
    ["&_listbox"]: {
      display: "flex",
      alignItems: "center",
      fontSize: "20px",
      ["&_hamburger"]: {
        zIndex: "10",
        position: "relative",
        width: "30px",
        height: "30px",
        display: "flex",
        alignItems: "center",
        transition: ".3s",
        ["&_line"]: {
          display: "block",
          ["&, &::before, &::after"]: {
            width: "100%",
            height: 0,
            borderBottom: "4px solid #fff",
            borderRadius: "2px",
            transition: "transform .3s 0s, border .1s .0s, all .1s .3s",
          },
          ["&::before, &::after"]: {
            content: '""',
            position: "absolute",
            width: "100%",
            transformOrigin: "left",
          },
          ["&::before"]: {
            transform: "translateY(-10px)",
          },
          ["&::after"]: {
            transform: "translateY(10px)",
          },
        },
      },
      ["&_list"]: {
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(0,0,0,.75)",
        transform: "translateX(100%)",
        transition: ".3s",
        overflow: "auto",
        ["&_item"]: {
          display: "block",
          // ['&:first-of-type']: {
          //   order: 1
          // },
          ["&_link"]: {
            display: "block",
            padding: "5px 10px",
            margin: "2px 0",
            ["&_img"]: {
              display: "none",
            },
            ["&_more"]: {
              display: "none",
            },
            ["&_text"]: {
              backgroundColor: "#fff",
            },
          },
          [".header_bar_listbox_list"]: {
            position: "unset",
            transform: "unset",
            backgroundColor: "unset",
            paddingTop: "unset",
            ["&_item"]: {
              ["&:first-of-type"]: {
                order: 0,
              },
            },
          },
        },
      },
    },
  },
  [mq[0]]: {
    [".header_bar"]: {
      ["&_listbox"]: {
        ["& > .header_bar_listbox_list"]: {
          height: "calc(100vh - 52px)",
          marginTop: "52px",
          // ['&> .header_bar_listbox_list_item:first-of-type']: {
          //   ['.header_bar_listbox_list_item_link']:{
          //     fontSize: '0.8em'
          //   }
          // }
        },
        ["&_hamburgercheckbox"]: {
          ["&:checked + .header_bar_listbox_hamburger"]: {
            transform: "rotate(90deg)",
            padding: "12px 0 0",
            [".header_bar_listbox_hamburger_line"]: {
              // transform: 'translateY(-12px) rotate(90deg)',
              borderRadius: "0 0 2px 2px",
              ["&::before, &::after"]: {
                width: "52%",
                height: "50%",
                border: "3px solid #fff",
                borderBottom: "0px",
                borderRadius: "50% 50% 0 0",
              },
              ["&::before"]: {
                transform: "translateY(-100%)",
              },
              ["&::after"]: {
                transform: "translateY(-100%) translateX(90%)",
              },
            },
          },
          ["&:checked ~"]: {
            [".header_bar_listbox_hamburgerall"]: {
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            },
            [".header_bar_listbox_list"]: {
              transform: "translateX(0)",
            },
          },
        },
      },
    },
  },
  [mq[1]]: {
    height: "80px",
    padding: "10px 6.56vw",
    [".header_bar"]: {
      ["&_logobox"]: {
        ["&_logo"]: {
          width: "175px",
        },
      },
      ["&_listbox"]: {
        ["&_hamburger, &_hamburgerall"]: {
          display: "none",
        },
        ["&_list"]: {
          display: "block",
          position: "unset",
          backgroundColor: "unset",
          transform: "unset",
          paddingTop: "unset",
          ["&_item"]: {
            display: "inline-block",
            ["&:first-of-type"]: {
              order: 0,
            },
            ["&_link"]: {
              color: "transparent",
              padding: "5px 18px",
              marginLeft: "17px",
              backgroundColor: "#aaaaaa55",
              border: "1px solid #ccc",
              borderRadius: "50px",
              ["&_img"]: {
                width: "25px",
                display: "inline-block",
                verticalAlign: "middle",
              },
              ["&_more"]: {
                display: "block",
              },
              ["&:hover"]: {
                ["& + .header_bar_listbox_list"]: {
                  transform: "translateX(0%)",
                  transition: "0.3s",
                },
              },
            },
            [".header_bar_listbox_list"]: {
              minWidth: "29vw",
              position: "absolute",
              top: "100%",
              right: "0",
              bottom: "unset",
              padding: "10px",
              backgroundColor: "rgba(0,0,0,.75)",
              transform: "translateX(100%)",
              transition: "all 0.3s .3s",
              ["&:hover"]: {
                transform: "translateX(0%)",
                transition: "0.3s",
              },
            },
          },
        },
      },
    },
  },
});

export const Container = styled.div({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  [".container"]: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    // marginTop: 'auto',
    ["&:first-of-type"]: {},
    [mq[0]]: {
      width: "auto",
      alignItems: "flex-end",
      height: "80%",
      [".right_area"]: {
        display: "none",
      },
    },
  },
  [".sliderbox"]: {
    position: "relative",
    width: "49%",
    maxWidth: "280px",
    ["&_root"]: {
      padding: "6.5%",
      ["&_card"]: {
        ["&_img"]: {},
      },
    },
    ["&_frame"]: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
  },
  [mq[1]]: {
    flexDirection: "row",
    alignItems: "center",
    [".container"]: {
      justifyContent: "space-between",
      alignItems: "center",
      ["&:first-of-type"]: {
        // paddingTop: '12vh',
      },
    },
    [".sliderbox"]: {
      maxWidth: "330px",
      marginLeft: "10em",
      height: "100%",
      ["&_frame"]: {},
    },
    [".right_area"]: {
      color: "pink",
      display: "flex",
      flexDirection: "column",
      gap: "5em",
      width: "48%",
      alignSelf: "start",
      ["&_top"]: {
        position: "relative",
        overflow: "hidden",
        paddingBottom: "5%",
        borderRadius: "5px",
        transition: "0.3s",
        ["img"]: {
          userSelect: "none",
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: "35%",
          height: "100%",
          verticalAlign: "middle",
          objectFit: "fill",
        },
      },
      ["&_bottom"]: {
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        ["&_item"]: {
          flex: "0 0 45%",
          width: "100%",
          position: "relative",
          overflow: "hidden",
          paddingBottom: "35%",
          borderRadius: "5px",
          transition: "0.3s",
          ["img"]: {
            userSelect: "none",
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: "100%",
            height: "70%",
            verticalAlign: "middle",
            objectFit: "fill",
          },
        },
      },
    },
  },
});
