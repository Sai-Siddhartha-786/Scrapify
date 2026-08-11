const mongoose = require('mongoose');

const scrapCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  icon: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  ratePerKg: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    default: 'kg'
  },
  co2PerKg: {
    type: Number,
    default: 0.5 // kg of CO2 saved per kg of scrap
  },
  greenCoinsPerKg: {
    type: Number,
    default: 10
  },
  isActive: {
    type: Boolean,
    default: true
  },
  color: {
    type: String,
    default: '#2D6A4F'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ScrapCategory', scrapCategorySchema);
