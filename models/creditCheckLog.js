const db = require('../util/database');

module.exports = class CreditCheckLog {

    async getByTenantID(tID) {
        let response = null;
        try {
            const res = await db.execute(`
                Select * From CreditCheckLog 
                Where TenantID = ${tID} 
                AND TenantsOthersOnLeaseID=0
            `);
            if(res[0].length > 0)
                response = res[0];
        } catch(err) {
            console.log(err);
        }
        return response;
    }

    async getByOthersOnLeaseID(id) {
        let response = null;
        try {
            const res = await db.execute(`
                SELECT * FROM CreditCheckLog WHERE TenantsOthersOnLeaseID = ${id}
            `);
            if(res[0].length > 0)
                response = res[0];
        } catch(err) {
            console.log(err);
        }
        return response;
    }
}