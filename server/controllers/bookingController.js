const Booking = require('../models/BookingSchema');
const Property = require('../models/PropertySchema');

exports.createBooking = async (req, res, next) => {
  try {
    const property = await Property.findById(req.body.propertyId);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    const booking = await Booking.create({
      propertyId: req.body.propertyId,
      ownerId: property.ownerId,
      tenantId: req.user._id,
      bookingStatus: 'pending'
    });

    res.status(201).json({ success: true, booking });
  } catch (error) {
    next(error);
  }
};

exports.getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ tenantId: req.user._id }).populate('propertyId');
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    next(error);
  }
};

exports.getOwnerBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ ownerId: req.user._id }).populate('propertyId tenantId');
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    next(error);
  }
};

exports.updateBookingStatus = async (req, res, next) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.user._id },
      { bookingStatus: req.body.bookingStatus },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.status(200).json({ success: true, booking });
  } catch (error) {
    next(error);
  }
};
