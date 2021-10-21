//
//
//
const fs = require("fs");
const utils = require("../utils/utils");
const firebaseMgr = require("../firebase/firebaseMgr");

function parseFile(bytes)
{
    var index = 0;
    var infoLength = utils.intFromBytes(bytes.slice(index, 8));
    index += 8;
    var info = JSON.parse(utils.utf8ArrayToStr(bytes.slice(index, infoLength + index)));
    index += infoLength;
    var rawBytes = bytes.slice(index, bytes.length);
    return {
        info: info,
        rawBytes: rawBytes
    }
}

module.exports = function (bytes) {
    return new Promise((resolve, reject) => {
        try {
            const {info, rawBytes} = parseFile(bytes);
            var {filepath, filedest} = info;
            if (filepath) {
                const storage = firebaseMgr.instance().storage();
                const file = storage.bucket().file(filepath, {
                    uploadType: {resumable: false}
                });
            
                file.save(rawBytes, (err) => {
                    if (!err) {
                        resolve(filepath);
                    }
                    else {
                        reject(err.message ? err.message :err);
                    }
                });
            }
            else if (filedest) {
                filedest = filedest.replace(/\\/g, '/');
                if (filedest.indexOf('./') >= 0) {
                    var index = __dirname.indexOf("functions");
                    var path = __dirname.substr(0, index).replace(/\\/g, '/');
                    filedest = filedest.replace("./", path);
                }

                fs.writeFile(filedest, rawBytes, (err) =>{
                    if (err) {
                        reject(err.message ? err.message :err);
                    }
                    else {
                        resolve(filedest);
                    }
                });
            }
            else {
                reject('none of filepath and filedest assigned');
            }                
        }
        catch(err) {
            reject(err.message ? err.message :err);
        }
    });
}