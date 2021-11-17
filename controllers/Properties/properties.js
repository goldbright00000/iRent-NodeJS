const Email = require('../../util/email');

const PropertiesModel = require('../../models/properties');

const Property = new PropertiesModel();

exports.getProperty = async (req, res, next) => {
    try {
        const propertyID = req.params.pID;
        return res.json(await Property.getByID(propertyID));
    } catch(err) {
        const email = new Email();
        await email.errorEmail(
            err,
            "iRent Backend - Properties Controller - getProperty"
        );
        return res.json([]);
    }  
}

exports.getProperties = async (req, res, next) => {
    try {
        const companyID = req.params.cID;
        return res.json(await Property.get(companyID));
    } catch(err) {
        const email = new Email();
        await email.errorEmail(
            err,
            "iRent Backend - Properties Controller - getProperties"
        );
        return res.json([]);
    }  
}

exports.addProperty = async (req, res, next) => {
    try {
        const data = req.body.data;
        
    } catch(err) {
        const email = new Email();
        await email.errorEmail(
            err,
            "iRent Backend - Properties Controller - addProperty"
        );
        return res.json([]);
    }  
}