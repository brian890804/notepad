
const firebaseMgr = require('../firebase/firebaseMgr');

module.exports = function ({name, age}) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = firebaseMgr.instance().firestore();
            const data = {
                name: name,
                age: age,
                createDate: new Date()
            };
            const result = await db.collection('test').add(data);
            resolve(result);
        }
        catch(err) {
            reject(err.message ? err.message : err);
        }
    });
}