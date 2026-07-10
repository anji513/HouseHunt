const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { getOwnerDashboard } = require('../controllers/ownerController');

const router = express.Router();

router.get('/dashboard', authMiddleware, roleMiddleware(['owner']), getOwnerDashboard);

module.exports = router;
