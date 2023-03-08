import { useCallback } from "react";

const dbName = "bh5_post";
var db;
var request = indexedDB.open(dbName, 2);
request.onupgradeneeded = function (event) {
  db = event.target.result;
  var objectStore = db.createObjectStore("customers", { keyPath: "ssn" });
  objectStore.createIndex("name", "name", { unique: true });
};
request.onsuccess = function (event) {
  db = event.target.result;
};

function useIndexDBController() {
  const addData = useCallback(async (postFileArray) => {
    var transaction = db.transaction(["customers"], "readwrite");
    var objectStore = transaction.objectStore("customers");

    await objectStore.put({
      ssn: "post_add_media",
      name: "media",
      data: [...postFileArray],
    });
  }, []);

  const readData = useCallback((callback) => {
    var transaction = db.transaction(["customers"]);
    var objectStore = transaction.objectStore("customers");
    var searchData = objectStore.get("post_add_media");
    searchData.onsuccess = function (event) {
      if (searchData.result) {
        if (searchData.result.data.length > 0) {
          if (typeof searchData.result.data === "string") {
            return callback([]);
          }
          return callback(searchData.result.data);
        }
      }
    };
  }, []);

  const deleteData = useCallback(() => {
    var transaction = db.transaction(["customers"], "readwrite");
    var objectStore = transaction.objectStore("customers");
    objectStore.delete("post_add_media");
    objectStore.onsuccess = function (event) {
      console.log(event, "event");
    };
  }, []);

  return {
    addData,
    readData,
    deleteData,
  };
}
export default useIndexDBController;
