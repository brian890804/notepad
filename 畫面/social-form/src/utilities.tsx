import callToast from "./Component/toastCall";


/**
 * @description 上傳檔案的事件
 *
 * @param { Event } e e.target的那個 e 指 input本體
 */
export const updateFileEventModule = function (event: any) {
  let files = event.target.files;
  let fileArray = false;
  if (files && files[0]) {
    // 檔案大小限制 50MB
    if (files[0].size <= 50 * 1024 * 1024) {
      return {
        file: files[0],
        url: null,
        progress: 0,
        delete: false,
        key: Math.floor(Math.random() * 999999999),
      };
    } else {
      callToast("档案不能超过 10MB (＞x＜) ");
    }
  }
  event.target.value = null;
  return fileArray;
};
/**
 * @description 獲取網址傳值 值
 *
 * 
 */
export const getHttpHeaderValue = () => {
  var url = window.location.href;

  //再來用去尋找網址列中是否有資料傳遞(QueryString)
  if (url.indexOf("?") != -1) {
    //之後去分割字串把分割後的字串放進陣列中
    var ary1 = url.split("?");
    //此時ary1裡的內容為：
    //ary1[0] = 'index.aspx'，ary2[1] = 'id=U001&name=GQSM'

    //下一步把後方傳遞的每組資料各自分割
    var ary2 = ary1[1].split("&");
    //此時ary2裡的內容為：
    //ary2[0] = 'id=U001'，ary2[1] = 'name=GQSM'

    //最後如果我們要找id的資料就直接取ary[0]下手，name的話就是ary[1]
    var ary3 = ary2[0].split("=");
    //此時ary3裡的內容為：
    //ary3[0] = 'id'，ary3[1] = 'U001'

    //取得id值
    var id = ary3[1];
    return id;
  }
};

export const token = String(getHttpHeaderValue());

