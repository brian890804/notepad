
const firebaseMgr = require('../firebase/firebaseMgr');

module.exports = function (dataKey) {
    return new Promise(async (resolve, reject) => {
        try {
            dataKey = dataKey.replace(/ /g, '');
            const db = firebaseMgr.instance().firestore();
            const result = await db.collection('test').doc(dataKey).get();
            const id = result.id;
            const data = result.data();
            //if (data.createDate) data.createDate = data.createDate.toDate();
            resolve({
                id: id,
                data: data
            });
        }
        catch(err) {
            reject(err.message ? err.message : err);
        }
    });
}