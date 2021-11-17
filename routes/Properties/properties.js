const express =  require('express');
const router = express.Router();

const propertyController = require('../../controllers/Properties/properties');

router.get('/:cID', propertyController.getProperties);
router.get('/property/:pID', propertyController.getProperty);

module.exports = router;