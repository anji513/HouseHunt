const User = require('../models/UserSchema');
const Property = require('../models/PropertySchema');
const Booking = require('../models/BookingSchema');

exports.getPendingOwners = async (req, res, next) => {
  try {
    const pendingOwners = await User.find({ role: 'owner', isApproved: false });
    res.status(200).json({ success: true, owners: pendingOwners });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

exports.getAllProperties = async (req, res, next) => {
  try {
    const properties = await Property.find().populate('ownerId', 'name email');
    res.status(200).json({ success: true, properties });
  } catch (error) {
    next(error);
  }
};

exports.getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate('propertyId tenantId ownerId');
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    next(error);
  }
};

exports.approveOwner = async (req, res, next) => {
  try {
    const owner = await User.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
    if (!owner) {
      return res.status(404).json({ success: false, message: 'Owner not found' });
    }

    res.status(200).json({ success: true, owner });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (error) {
    next(error);
  }
};
