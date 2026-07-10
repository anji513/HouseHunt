const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ownerName: { type: String, required: true },
  ownerContact: { type: String, required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  rentAmount: { type: Number, required: true },
  propertyType: { type: String, required: true },
  furnishingStatus: { type: String, required: true },
  amenities: [{ type: String }],
  images: [{ type: String }],
  availability: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
