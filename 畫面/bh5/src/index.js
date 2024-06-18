import React from "react";
import ReactDOM from "react-dom";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import initReactFastclick from "react-fastclick";
import smoothscroll from "smoothscroll-polyfill";
import { MetronicI18nProvider } from "./i18n/Metronici18n";
import axios from "axios";

import { Provider } from "react-redux";

import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import "./reset.css";
import "./App.scss";
import "./global.scss"; //<----------自訂義格式 padding margin fontWeight

import App from "./App";
import { zzzzz } from "./reducers/actions/utilities";

initReactFastclick();
// node js 版本 v14.16.1
ReactDOM.render(
  <React.StrictMode>
    <MetronicI18nProvider>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </MetronicI18nProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

function getUrlParameter() {
  var url = window.location.search; //獲取url中"?"符後的字串
  var theRequest = {};
  var strs = null;
  if (url.indexOf("?") !== -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}
var urlParameter = {};
urlParameter = getUrlParameter();

if (urlParameter.utm_source || urlParameter.shareMa) {
  localStorage.setItem("urlParameterTimestamp", Date.now());
  window.localStorage.setItem("utmMark", JSON.stringify(urlParameter));
}

if (urlParameter.tracker) {
  axios(
    "http://syndication.exoclick.com/tag.php?goal=07f3f9c0277915fb4f639cb01b5fa6b3&tag=" +
      urlParameter.tracker
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// 獲取 ios 高度 之後要改成可以自動 resize 因為 url 縮下去和長大的時候需要同時變更

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit

// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty(
  "--vh",
  `${window.innerHeight * 0.01}px`
);
window.addEventListener("resize", function () {
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

// kick off the polyfill!
smoothscroll.polyfill();

console.log(
  [
    "                   _ooOoo_",
    "                  o8888888o",
    '                  88" . "88',
    "                  (| -_- |)",
    "                  O\\  =  /O",
    "               ____/`---'\\____",
    "             .'  \\\\|     |//  `.",
    "            /  \\\\|||  :  |||//  \\",
    "           /  _||||| -:- |||||-  \\",
    "           |   | \\\\\\  -  /// |   |",
    "           | \\_|  ''\\---/''  |   |",
    "           \\  .-\\__  `-`  ___/-. /",
    "         ___`. .'  /--.--\\  `. . __",
    '      ."" \'<  `.___\\_<|>_/___.\'  >\'"".',
    "     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |",
    "     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /",
    "======`-.____`-.___\\_____/___.-`____.-'======",
    "                   `=---='",
    "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
    "         佛祖保佑       BUG退散",
  ].join("\n")
);

if (process.env.NODE_ENV !== "development") {
  console.log = () => {};
  document.onkeydown = function (e) {
    if (e.key === "F12") {
      return false;
    }

    if (e.ctrlKey) {
      return false;
    }
  };

  setInterval(() => {
    let time = Date.now();
    // eslint-disable-next-line no-undef
    toDebug();
    if (Date.now() - time > 300) {
      zzzzz();
      setTimeout(() => {
        while (true) {
          alert("请勿偷取本站资料～！");
          window.addEventListener("blur", function () {
            window.close();
          });
        }
      }, 500);
    }
  }, 100);
}
