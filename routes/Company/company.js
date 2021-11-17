const express =  require('express');
const router = express.Router();

const companyController = require('../../controllers/Company/company');

router.get('/get/:cID', companyController.getDetails);
router.get('/currencies', companyController.getCurrencies);
router.get('/billingNotification/:cID', companyController.getBillingNotification);
router.get('/creditCard/:cID', companyController.getCompanyCC);
router.get('/bank/:cID', companyController.getCompanyBank);
router.post('/updDetails', companyController.updDetails);
router.post('/updSettings', companyController.updSettings);
router.post('/updAutoBill', companyController.updAutoBill);
router.post('/updCC', companyController.updCompCC);
router.post('/updBank', companyController.updCompBank);
router.post('/verifyBank', companyController.verifyBank);
router.post('/updPaymentMethod', companyController.updPaymentMethod);
router.get('/properties/:cID', companyController.getProperties);
router.get('/securityLevels', companyController.getSecurityLevels);
router.get('/users/:cID', companyController.getUsers);
router.post('/addUser', companyController.addUser);
router.get('/deleteUser/:uID/:cID', companyController.deleteUser);
router.post('/updUser', companyController.updUser);
router.get('/owners/:cID', companyController.getOwners);
router.post('/addOwner', companyController.addOwner);
router.get('/deleteOwner/:oID', companyController.deleteOwner);
router.post('/updOwner', companyController.updOwner);

module.exports = router;