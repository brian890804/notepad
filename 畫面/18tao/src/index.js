import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import TagManager from 'react-gtm-module';

let tagManagerArgs = {
  gtmId: 'GTM-5CXQC6V'
}

const webUrl = window.location.href;
console.log(webUrl);
if(webUrl.indexOf('bliav-3') !== -1) {
  tagManagerArgs.gtmId = 'GTM-WTFGLCC';
}else if(webUrl.indexOf('bliav-2') !== -1) {
  tagManagerArgs.gtmId = 'GTM-WTFGLCC';
}else if(webUrl.indexOf('bliav-1') !== -1) {
  tagManagerArgs.gtmId = 'GTM-T95HXBZ';
}else if(webUrl.indexOf('bliav') !== -1){
  tagManagerArgs.gtmId = 'GTM-TG5JDN3';
}

TagManager.initialize(tagManagerArgs);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);
