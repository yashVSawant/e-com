const express = require('express');

const router = express.Router();

const authentication = require('../middelwares/authentication')
const controller = require('../controllers/product');


router.post('/',authentication.authenticate,controller.postProduct);
router.get('/',authentication.authenticate,controller.getProduct);

module.exports = router;