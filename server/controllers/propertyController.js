const Property = require('../models/PropertySchema');

exports.createProperty = async (req, res, next) => {
  try {
    const propertyData = {
      ...req.body,
      ownerId: req.user._id,
      ownerName: req.user.name,
      ownerContact: req.user.phone || '',
      images: req.files ? req.files.map((file) => file.filename) : []
    };

    const property = await Property.create(propertyData);
    res.status(201).json({ success: true, property });
  } catch (error) {
    next(error);
  }
};

exports.getProperties = async (req, res, next) => {
  try {
    const properties = await Property.find({ availability: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, properties });
  } catch (error) {
    next(error);
  }
};

exports.getPropertyById = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    res.status(200).json({ success: true, property });
  } catch (error) {
    next(error);
  }
};

exports.updateProperty = async (req, res, next) => {
  try {
    const property = await Property.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.user._id },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    res.status(200).json({ success: true, property });
  } catch (error) {
    next(error);
  }
};

exports.deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findOneAndDelete({ _id: req.params.id, ownerId: req.user._id });
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    res.status(200).json({ success: true, message: 'Property deleted' });
  } catch (error) {
    next(error);
  }
};
