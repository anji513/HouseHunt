const Property = require('../models/PropertySchema');
const Booking = require('../models/BookingSchema');

exports.getOwnerDashboard = async (req, res, next) => {
  try {
    const properties = await Property.find({ ownerId: req.user._id });
    const bookings = await Booking.find({ ownerId: req.user._id }).populate('tenantId', 'name email');
    res.status(200).json({ success: true, properties, bookings });
  } catch (error) {
    next(error);
  }
};
