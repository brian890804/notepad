/*eslint-disable*/
const firebaseMgr = require('../firebase/firebaseMgr');

module.exports = function ({ name, age }) {
    return new Promise( (resolve, reject) => {
        try {
            const db = firebaseMgr.instance().firestore();
            const data = {
                name: name,
                age: age,
                createDate: new Date()
            };
            const key="2021_10_278";
            db.collection('test').doc(key).set(data)
            .then(function(result) {
                resolve(result);
            })
            .catch(function(err) {
                throw new Error(err.message ? err.message : err);
            });
        }
        catch (err) {
            reject(err.message ? err.message : err);
        }
    });
}