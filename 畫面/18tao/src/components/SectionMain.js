import { SectionMainComponentsElement } from "./SectionMainComponents/SectionMainComponentsElement";
import ImageComponent from "./ImageComponent";
import phoneImg from "../assets/phone0.png";
import descriptionImg from "../assets/description.png";
import description1Img from "../assets/description1.png";
import iphoneImg from "../assets/iphone.png";
import androidImg from "../assets/android.png";
import qrcodeImg from "../assets/qrcode.png";
const SectionMain = () => {
  function onHandleClick(type) {
    if (type === "ios") {
      window.location.href = "https://ficgqwp.cn/rEzKc";
    } else {
      window.location.href = "https://ficgqwp.cn/hlFJX";
    }
  }
  return (
    <SectionMainComponentsElement>
      <div className="item">
        <ImageComponent
          width={60}
          height={120}
          src={phoneImg}
          alt="18淘注册提示图"
          title="18淘注册提示图"
        />
      </div>
      <div className="item column">
        <ImageComponent
          width={60}
          height={36}
          src={descriptionImg}
          alt="在18淘没有翘不起来的屌,立即扫码勃起"
          title="在18淘没有翘不起来的屌,立即扫码勃起"
        />
        <div className="item">
          <div className="item column">
            <img
              src={androidImg}
              className="link"
              alt="18淘安卓下载图"
              title="18淘安卓下载图"
              onClick={() => onHandleClick("android")}
            />
            <img
              src={iphoneImg}
              className="link"
              alt="18淘ios下载图"
              title="18淘ios下载图"
              onClick={() => onHandleClick("ios")}
            />
          </div>
          <img
            src={qrcodeImg}
            className="link"
            alt="18淘注册提示图"
            title="18淘注册提示图"
          />
        </div>
        <img
          src={description1Img}
          alt="18淘注册提示图"
          title="18淘注册提示图"
        />
      </div>
    </SectionMainComponentsElement>
  );
};
export default SectionMain;
