const mongoose = require('mongoose');

const scrapItemSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ScrapCategory',
    required: true
  },
  categoryName: String,
  estimatedWeight: Number,
  actualWeight: { type: Number, default: 0 },
  ratePerKg: Number,
  amount: { type: Number, default: 0 }
});

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  bookingId: {
    type: String,
    unique: true
  },
  scrapItems: [scrapItemSchema],
  pickupAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    landmark: String
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  scheduledSlot: {
    type: String,
    enum: ['9AM-12PM', '12PM-3PM', '3PM-6PM', '6PM-9PM'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'agent_assigned', 'agent_en_route', 'pickup_in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  totalEstimatedWeight: {
    type: Number,
    default: 0
  },
  totalActualWeight: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    default: 0
  },
  greenCoinsEarned: {
    type: Number,
    default: 0
  },
  bonusCoins: {
    type: Number,
    default: 0
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'upi', 'wallet'],
    default: 'cash'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  rating: {
    score: { type: Number, min: 1, max: 5 },
    review: String,
    ratedAt: Date
  },
  notes: String,
  images: [String],
  completedAt: Date,
  cancelledAt: Date,
  cancellationReason: String
}, {
  timestamps: true
});

// Generate booking ID
bookingSchema.pre('save', function(next) {
  if (!this.bookingId) {
    const date = new Date();
    this.bookingId = 'SCR' + date.getFullYear().toString().slice(-2) +
      String(date.getMonth() + 1).padStart(2, '0') +
      String(date.getDate()).padStart(2, '0') +
      Math.random().toString(36).substring(2, 7).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
