const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { createBooking, getBookings, getOwnerBookings, updateBookingStatus } = require('../controllers/bookingController');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['user']), createBooking);
router.get('/user', authMiddleware, roleMiddleware(['user']), getBookings);
router.get('/owner', authMiddleware, roleMiddleware(['owner']), getOwnerBookings);
router.put('/:id/status', authMiddleware, roleMiddleware(['owner']), updateBookingStatus);

module.exports = router;
