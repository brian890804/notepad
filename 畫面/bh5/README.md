# blili 說明文件

文件架構說明  
root  
├ assets 各種檔案與圖片  
├ modules 部分引用的套件先在這邊建立實體統一呼叫  
├ pages 各頁面分資料夾製作  
│　├ component 共用的組件檔案  
│　└ **** 對應頁面資料夾  
│　　├ component 組件檔案  
│　　├ ****action.js 只有這一頁會用到的 redux action  
│　　├ ****Handle.js 對應的資料和function處理  
│　　└ ****Render.js 對應頁面的html和css與資料嵌入處發位置等  
├ reducers redux 主要區塊  
├ routes routes 用
├  
(略)  

## scroll 事件說明

部分 scroll 事件會因為依賴某些參數去移除重加，這是因為 React 並不建議備使用直接操作 DOM 的方法 addEventListener，這樣的方式會讓該事件脫離 React 的掌控並且無法再資料畫面刷新後去處理該事件重新指向正確記憶體位置的問題，所以在 React 刷新後需要依照 scroll 需要的資料或事件進行對應的依賴，當依賴的資料或事件因為 React 畫面或資料的刷新並可能因此更改記憶體位置的話去對加在 DOM 的事件進行移除與重加，以便讓該 scroll 能夠跟隨 React 的機制正常運作。

## 暫存資料說明

分為三種暫存資料，依照用途區分

## 路由說明

各路遊動畫控制是由 react-transition-group 所控制，是由網頁的網址對應層數文字變更時觸發  
依照每層對應的 /A/B/C 來控制，請參照 SwitchRoute 的 SwitchRouteStateToProps 去思考
* app 是第一層，當 A 的參數改變時觸發  
* 其餘各頁是第二層，當 B 的參數改變時觸發  
* 各頁的下面是第三層，當 C 的參數改變時觸發  

設計新路由路徑時請留意路由動畫控制原理

新增路由時請勿使用動態路由如 /a/參數/ ，參數使用網址帶如 ?X=xx 方便路由檢查與路由切換

>### 系統資料
在前端程式內建立時間點並更新上去，在此以前的進行重撈並更新取得時間點後存放。此類 api 就都不需要再打了  
時間點在 constants.js 變數 systemTimestamp  
[產生時間戳](https://www.unixtimestamp.com/)

>### 時效性資料
屬於一定時效後就需要更新的資料，時間檢查戳存在用戶那邊。檢查超過一定時效就更新
短期時間點在 constants.js 變數 shortTermTimestamp
每日刷新的不另外存


>### 快取資料
屬於不刷掉的資料，每個資料都有對應的處理方式。例如影片類 list 進來撈取新資料時發現就有資料重複的情況就把之前不重複的塞在前面，後面的資料再接續減少撈取 api 的次數

## 套件說明
---
### eslint 確保程式碼品質

當你的 useEffect 的依賴參數不要被觀察觸發 function 的話，加上這一個忽略讓警告消失
// eslint-disable-next-line react-hooks/exhaustive-deps

---
### styleslint 整理 scss

當 render scss 完成後先行 commit 再跑 npm run lcss 自動整理後確定沒有奇怪的錯誤後再 commit 因為自動修富有時候會有bug

會用在 scss 內的變數等等只能用 _ 分隔不能用大駝峰

---
### redux 套件 

store.js 建立 store 實體和引入中間處理件的位置  
└ reducers 此文件檔下方是 redux 的主要處理資料夾  
　├ *.js 為各種統一儲存與處理的資料位置  
　└ actions 通用的 actions 存放位置  
　　└ *.js 每頁都可能用到的 actions  

---
### axios 套件

建立在 modules 統一處理 ajax 相關的所有呼叫並建立實例，當呼叫的時候會跳一個讀取中的圈圈放在 app.js 裡面

---
### toast 套件

要用的時候直接呼叫 toastCall 避免重複錯誤過度呼叫

---


要完成的項目

註冊帳號的按鈕要加上 loading 防止高併發

6.漫畫美圖選擇翻頁功能時固定圖片比較好操作