import { MobileSectionMainComponentsElement } from "./MobileSectionMainComponents/MobileSectionMainComponentsElement";
import ImageComponent from "./ImageComponent";
import phoneImg from "../assets/phone0.png";
import descriptionImg from "../assets/description.png";
import description1Img from "../assets/description1.png";
import iphoneImg from "../assets/iphone.png";
import androidImg from "../assets/android.png";
import qrcodeImg from "../assets/qrcode.png";
const MobileSectionMain = () => {
  function onHandleClick(type) {
    if (type === "ios") {
      window.location.href = "https://ficgqwp.cn/rEzKc";
    } else {
      window.location.href = "https://ficgqwp.cn/hlFJX";
    }
  }
  return (
    <MobileSectionMainComponentsElement>
      <div className="item column">
        <ImageComponent
          width={60}
          height={120}
          src={phoneImg}
          alt="18淘注册提示图"
          title="18淘注册提示图"
        />
        <ImageComponent
          width={60}
          height={36}
          src={descriptionImg}
          alt="在18淘没有翘不起来的屌,立即扫码勃起"
          title="在18淘没有翘不起来的屌,立即扫码勃起"
        />
        <div className="item ">
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
          src={description1Img}
          alt="18淘注册提示图"
          title="18淘注册提示图"
        />
      </div>
    </MobileSectionMainComponentsElement>
  );
};
export default MobileSectionMain;
