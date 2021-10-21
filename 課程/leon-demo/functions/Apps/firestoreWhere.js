const firebaseMgr = require('../firebase/firebaseMgr');

module.exports = function ({name, age}) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = firebaseMgr.instance().firestore();
            var query = db.collection('test');
            if (name) query = query.where("name", "==", name);
            if (age) query = query.where("age", "==", age);
            const result = await query.get();
            const datas = [];
            result.forEach(element => {
                const id = element.id;
                const data = element.data();
                if (data.createDate) data.createDate = data.createDate.toDate();
                datas.push({
                    id: id,
                    data: data
                });
            });
            resolve(datas);
        }
        catch(err) {
            reject(err.message ? err.message : err);
        }
    });
}