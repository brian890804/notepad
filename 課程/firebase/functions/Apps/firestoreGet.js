/* eslint-disable */
const firebaseMgr = require('../firebase/firebaseMgr');

module.exports = function (dataKey) {
    return new Promise((resolve, reject) => {
        try {
            dataKey = dataKey.replace(/ /g, '');
            const db = firebaseMgr.instance().firestore();
            db.collection('test').doc(dataKey).get()
            .then(function(result) {
                const id = result.id;
                const data = result.data();
                if (data.createData) data.createData = data.createData.toDate();
                //if (data.createDate) data.createDate = data.createDate.toDate();
                resolve({
                    id: id,
                    data: data
                });
            })
            .catch(function(err) {
                throw new Error(err.message ? err.message : err);
            })
        }
        catch (err) {
            reject(err.message ? err.message : err);
        }
    });
}