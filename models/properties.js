const db = require('../util/database');

module.exports = class Properties {

    async getByID(pID) {
        let response = null;
        try {
            const res = await db.execute(`
                SELECT * FROM Properties Where PropertyID = ${pID}
            `);
            if(res[0].length > 0)
                response = res[0][0];
        } catch(err) {
            console.log(err);
        }
        return response;
    }

    async get(cID) {
        let response = [];
        try {
            const res = await db.execute(`
                SELECT * FROM Properties Where CompanyID = ${cID} AND Active <> 2
                Order By PropertyName
            `);
            if(res[0].length > 0)
                response = res[0];
        } catch(err) {
            console.log(err);
        }
        return response;
    }

    async getEvictionThreshold(pID) {
        let response = {
            Threshold: 0,
            EvictionThreshold: 0
        };
        try {
            const res = await db.execute(`
                SELECT Threshold, EvictionThreshold 
                FROM Properties 
                Where PropertyID = ${pID}
            `);
            if(res[0].length > 0) {
                response.Threshold = parseFloat(res[0][0].Threshold);
                response.EvictionThreshold = parseFloat(res[0][0].EvictionThreshold);
            }
        } catch(err) {
            console.log(err);
        }
        return response;
    }

    async getPmAdminContact(pID) {
        let response = {
            fName: null,
            lName: null,
            email: null,
            phone: null
        };
        try {
            let res = await db.execute(`
                select u.UserFName, u.UserLName, u.UserEmail, u.UserPhone
                From Users u
                JOIN UserPropertyMap upm ON u.UserID = upm.UserID
                where upm.propertyid = ${pID}
                and u.active = 1
                and u.securitylevelid = 2
            `);
            if(res[0].length > 0) {
                response.fName = res[0][0].UserFName;
                response.lName = res[0][0].UserLName;
                response.email = res[0][0].UserEmail;
                response.phone = res[0][0].UserPhone;
            } else {
                res = await db.execute(`
                    select u.UserFName, u.UserLName, u.UserEmail, u.UserPhone
                    From Users u
                    JOIN UserPropertyMap upm ON u.UserID = upm.UserID
                    where upm.propertyid = ${pID}
                    and u.active = 1
                    and u.securitylevelid = 1
                `);
                response.fName = res[0][0].UserFName;
                response.lName = res[0][0].UserLName;
                response.email = res[0][0].UserEmail;
                response.phone = res[0][0].UserPhone;
            }
        } catch(err) {
            console.log(err);
        }
        return response;
    }

    async getListPmAdminContact(pID) {
        let response = [];
        try {
            let res = await db.execute(`
                select u.UserFName, u.UserLName, u.UserEmail, u.UserPhone
                From Users u
                JOIN UserPropertyMap upm ON u.UserID = upm.UserID
                where upm.propertyid = ${pID}
                and u.active = 1
                and u.securitylevelid = 2
            `);
            if(res[0].length > 0) {
                for(const r of res[0]) {
                    response.push({
                        fName: r.UserFName,
                        lName: r.UserLName,
                        email: r.UserEmail,
                        phone: r.UserPhone
                    });
                }
            } else {
                res = await db.execute(`
                    select u.UserFName, u.UserLName, u.UserEmail, u.UserPhone
                    From Users u
                    JOIN UserPropertyMap upm ON u.UserID = upm.UserID
                    where upm.propertyid = ${pID}
                    and u.active = 1
                    and u.securitylevelid = 1
                `);
                for(const r of res[0]) {
                    response.push({
                        fName: r.UserFName,
                        lName: r.UserLName,
                        email: r.UserEmail,
                        phone: r.UserPhone
                    });
                }
            }
        } catch(err) {
            console.log(err);
        }
        return response;
    }

    async getAllPropsFromPropID(pID) {
        let response = [];
        try {
            const res = await db.execute(`
                SELECT * FROM Properties 
                Where CompanyID in (
                    Select CompanyID From Properties Where PropertyID = ${pID} and active = 0
                )
            `);
            response = res[0];
        } catch(err) {
            console.log(err);
        }
        return response;
    }

    async getUsersProperties(uID) {
        let response = [];
        try {
            const res = await db.execute(`
                Select p.PropertyID, p.PropertyName
                From Properties p 
                JOIN UserPropertyMap upm ON p.PropertyID = upm.PropertyID
                Where upm.UserID = ${uID} and p.Active != 2
                Order By p.PropertyName
            `);
            response = res[0];
        } catch(err) {
            console.log(err);
        }
        return response;
    }

    async getOwnersProperties(oID) {
        let response = [];
        try {
            const res = await db.execute(`
                Select p.PropertyID, p.PropertyName
                From Properties p 
                JOIN OwnerPropertyMap opm ON p.PropertyID = opm.PropertyID
                Where opm.OwnerID = ${oID} and p.Active != 2
                Order By p.PropertyName
            `);
            if(res[0].length > 0)
                response = res[0];
        } catch(err) {
            console.log(err);
        }
        return response;
    }

    async getCompanyPropDetailsByTenant(tID) {
        let response = null;
        try {
            const res = await db.execute(`
                Select c.CompanyName, p.PropertyName, p.PropertyAddress1, p.PropertyAddress2,
                    p.PropertyCity, p.PropertyState, p.PropertyZip, p.PropertyPhone
                From Tenants t 
                JOIN Properties p ON p.PropertyID = t.PropertyID
                JOIN Company c ON p.CompanyID = c.CompanyID
                Where t.TenantID = ${tID}
            `);
            if(res[0].length > 0)
                response = res[0][0];
        } catch(err) {
            console.log(err);
        }
        return response;
    }
}