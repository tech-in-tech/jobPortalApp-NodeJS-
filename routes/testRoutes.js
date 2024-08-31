const express = require('express');
const { testController } = require('../controllers/testController');
const authMiddleware = require('../middlewares/authMiddleware');

// Router Object
const router = express.Router();

// router
router.get('/testGet',authMiddleware,testController)


// Export
module.exports = router;