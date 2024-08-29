const express = require('express');
const { testController } = require('../controllers/testController');

// Router Object
const router = express.Router();

// router
router.get('/testGet',testController)


// Export
module.exports = router;