import axios from "axios";
import { apiDomain } from "../../constant";
import { IUseState } from "../../Pages/SocialForm";
import { token } from "../../utilities";

const axiosItem = axios.create({
  baseURL: apiDomain,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
export function getFieldData() {
  return axiosItem.get("mobileapi/oneforone/getOptions");
}

export function postCreateProfile(
  values: Public.MyFormValues,
  img: Array<IUseState>
) {
  let newImgArray = img
    .map((mapData) => mapData.file)
    .filter((filterData) => filterData !== "");
  const formData = new FormData();
  formData.append("user_id", token);
  for (const [key, value] of Object.entries(values)) {
    if (key !== "coin") {
      formData.append(key, value);
    }
  }

  for (let imgFile of newImgArray) {
    formData.append("file[]", imgFile);
  }

  for (let coin of values.coin) {
    formData.append("coin[]", coin);
  }

  let newSize: string = "";
  switch (values.size) {
    case "0":
      newSize = "纖細";
      break;
    case "1":
      newSize = "偏瘦";
      break;
    case "2":
      newSize = "標準";
      break;
    case "3":
      newSize = "稍壯";
      break;
    case "4":
      newSize = "微肉";
      break;
    case "5":
      newSize = "肉感";
      break;
    default:
      break;
  }

  formData.append("user_id", token);
  // Object.keys(values).map((data) =>
  //   formData.append(data, String(values[data as keyof Public.MyFormValues]))
  // ); 這個也行
  formData.delete("size");
  formData.append("size", newSize);
  return axiosItem.post("/mobileapi/oneforone/createProfile", formData);
}

export function getUserProfile() {
  const formData = new FormData();
  formData.append("user_id", token);
  formData.append("is_edit", String(1));
  return axiosItem.post("mobileapi/oneforone/getProfile", formData);
}
