import React, { useRef, useEffect } from "react";
import logoSrc from "../../assets/Blogo.png";
import { HeaderBar } from "./SectionPhoneSliderElement";

function preventDefault(e) {
  e.stopPropagation();
}


export default function HeaderBarItem (props) {
  const { navListData, nowMediaQuery } = props;
  const element = useRef(null);

  useEffect(()=>{
    element.current.removeEventListener('wheel', preventDefault, false);
    element.current.removeEventListener('mouseup', preventDefault, false);
    element.current.removeEventListener('touchend', preventDefault, false); 
    element.current.addEventListener('wheel', preventDefault, false);
    element.current.addEventListener('mouseup', preventDefault, false);
    element.current.addEventListener('touchend', preventDefault, false); 
  }, [])

  return (
    <HeaderBar
      color="#00f"
      ref={element}
    >
      <nav
        className="header_bar"
      >
        <div className="header_bar_logobox">
          <img className="header_bar_logobox_logo" alt="B次元" src={logoSrc} />
        </div>
        <div className="header_bar_listbox">
          <input id="header_bar_listbox_hamburgercheckbox" className="header_bar_listbox_hamburgercheckbox displaynone" type="checkbox" />
          <label
            htmlFor="header_bar_listbox_hamburgercheckbox"
            className="header_bar_listbox_hamburger"
          >
            <span className="header_bar_listbox_hamburger_line" />
          </label>
          <label
            htmlFor="header_bar_listbox_hamburgercheckbox"
            className="header_bar_listbox_hamburgerall"
          />
          <ul
            className="header_bar_listbox_list"
          >
            {navListData.map((value, index) => {
              return (
                <li
                  className="header_bar_listbox_list_item"
                  key={'listTitle_' + index}
                >
                  <a
                    className={"header_bar_listbox_list_item_link RGB_effect " + (value.href ? "" : "header_bar_listbox_list_item_link_more")}
                    target="_blank"
                    rel="noreferrer"
                    href={value.href ? value.href : null}
                  >
                    {value.icon ? <img className="header_bar_listbox_list_item_link_img" src={value.icon } alt={value.title}/> : ''}
                    <span 
                      className="header_bar_listbox_list_item_link_text"
                      style={{
                        marginLeft: value.icon && nowMediaQuery === 'desktop' ? '8px' : 0
                      }}
                    >{value.title}</span>
                  </a>
                  { value.subList ?
                    <ul
                      className="header_bar_listbox_list"
                    >
                      {value.subList.map((val, ind) => {
                        return (
                          <li
                            className="header_bar_listbox_list_item"
                            key={"subListTitle_" + ind}
                          >
                            <a
                              className={"header_bar_listbox_list_item_link RGB_effect " + (val.href ? "" : "header_bar_listbox_list_item_link_more")}
                              target="_blank"
                              rel="noreferrer"
                              href={val.href ? val.href : null}
                            >
                              {val.icon ? <img className="header_bar_listbox_list_item_link_img" src={val.icon } alt={val.title}/> : ''}
                              <span 
                                className="header_bar_listbox_list_item_link_text"
                                style={{
                                  marginLeft: val.icon && nowMediaQuery === 'desktop' ? '8px' : 0
                                }}
                              >{val.title}</span>
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                    : null}
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </HeaderBar>
  )
}