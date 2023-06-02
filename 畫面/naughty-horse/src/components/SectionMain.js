import { SectionMainComponentsElement } from "./SectionMainComponents/SectionMainComponentsElement";
import logo from "../assets/logo.png";
import left_text from "../assets/left_text.png";
import android from "../assets/android.png";
import app from "../assets/app.png";
import pc from "../assets/pc.png";
function judgeParameter(type) {
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  const utmSource = searchParams.get("utm_source");
  if (type === "pc") {
    switch (utmSource) {
      case "thepornbest":
        return "https://wwam.lanzouc.com/iXKb80y03r1g";
      case "tg":
        return "https://wwam.lanzouc.com/iArLP0y0509e";
      default:
        return "https://ficgqwp.cn/BPYCP";
    }
  }else{
    switch (utmSource) {
      case "bcy_ads":
        return "https://wwam.lanzouc.com/ifImt0xu7dva";
      case "thepornbest":
        return "https://wwam.lanzouc.com/iXKb80y03r1g";
      case "tg":
        return "https://wwam.lanzouc.com/iArLP0y0509e";
      default:
        return "https://ficgqwp.cn/VKbQf";
    }
  }
}
const SectionMain = () => {
  const deviceItem = [
    {
      img: android,
      text: "顽皮马Android LOGO",
      url: judgeParameter(),
    },
    {
      img: app,
      text: "顽皮马App LOGO",
      url: "https://ficgqwp.cn/VOzCx",
    },
    {
      img: pc,
      text: "顽皮马Pc LOGO",
      url: judgeParameter('pc'),
    },
  ];

  function onHandleClick(url) {
    window.location.href = url;
  }
  return (
    <SectionMainComponentsElement>
      <div className="title">
        <img src={logo} alt="顽皮马LOGO" />
      </div>
      <img className="left_text" src={left_text} alt="顽皮马描述" />
      <div className="bottom_device_items">
        {deviceItem.map((data) => (
          <img
            src={data.img}
            alt={data.text}
            title={data.text}
            onClick={() => onHandleClick(data.url)}
          />
        ))}
      </div>
    </SectionMainComponentsElement>
  );
};
export default SectionMain;
