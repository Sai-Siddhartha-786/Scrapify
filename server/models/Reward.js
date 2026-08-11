const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  icon: String,
  coinsRequired: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['discount', 'cashback', 'donation', 'merchandise', 'voucher'],
    required: true
  },
  value: {
    type: Number, // discount percentage or cashback amount
    required: true
  },
  partnerName: String,
  partnerLogo: String,
  isActive: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    default: -1 // -1 = unlimited
  },
  expiresAt: Date
}, {
  timestamps: true
});

const redemptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reward: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reward',
    required: true
  },
  coinsSpent: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['redeemed', 'used', 'expired'],
    default: 'redeemed'
  },
  code: String,
  expiresAt: Date
}, {
  timestamps: true
});

const Reward = mongoose.model('Reward', rewardSchema);
const Redemption = mongoose.model('Redemption', redemptionSchema);

module.exports = { Reward, Redemption };
