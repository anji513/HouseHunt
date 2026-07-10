const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { getPendingOwners, approveOwner, getUsers, getAllProperties, getAllBookings, deleteUser } = require('../controllers/adminController');

const router = express.Router();

router.get('/owners/pending', authMiddleware, roleMiddleware(['admin']), getPendingOwners);
router.get('/users', authMiddleware, roleMiddleware(['admin']), getUsers);
router.get('/properties', authMiddleware, roleMiddleware(['admin']), getAllProperties);
router.get('/bookings', authMiddleware, roleMiddleware(['admin']), getAllBookings);
router.put('/approve-owner/:id', authMiddleware, roleMiddleware(['admin']), approveOwner);
router.delete('/user/:id', authMiddleware, roleMiddleware(['admin']), deleteUser);

module.exports = router;
