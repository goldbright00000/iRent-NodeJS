const db = require('../util/database');

const today = new Date();
const formattedDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

module.exports = class Journal {

    async add(data) {
        try {
            await db.execute(`
                INSERT INTO Journal(PropertyID, JournalTypeID, JournalAmount, DateEntered, EnteredBy, 
                    JournalDescription, ModifiedBy, ModifiedDate, LenderID, CheckRegisterID)
            VALUES (${data.propertyID}, ${data.journalType}, ${data.amount}, '${formattedDate(new Date())}', 
                ${data.userID}, '${data.description}', ${data.userID}, '${formattedDate(new Date())}', ${data.lenderID}, ${data.checkRegisterID})
            `);
        } catch(err) {
            console.log(err);
        }
    }

    async getByCheckRegister(crID) {
        let response = null;
        try {
            const res = await db.execute(`
                Select * From Journal 
                where checkregisterid = ${crID}                
            `);
            if(res[0].length > 0)
                response = res[0][0];
        } catch(err) {
            console.log(err);
        }
        return response;
    }

    async getAllByCheckRegister(crID) {
        let response = [];
        try {
            const res = await db.execute(`
                Select * From Journal 
                where checkregisterid = ${crID}                
            `);
            response = res[0];
        } catch(err) {
            console.log(err);
        }
        return response;
    }
}