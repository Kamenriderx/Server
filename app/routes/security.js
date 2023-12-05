const express = require('express');
const router = express.Router()
const {sendRestoreEmail,restorePassword} = require('../controllers/security');
const authToken = require('../middlewares/authToken');



router.post("/sendRestoreEmail",sendRestoreEmail);
router.put('/:token',authToken,restorePassword);


module.exports = router