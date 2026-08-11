const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
    match: [/^[6-9]\d{9}$/, 'Please add a valid Indian phone number']
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  address: {
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    pincode: { type: String, default: '' },
    landmark: { type: String, default: '' }
  },
  role: {
    type: String,
    enum: ['user', 'agent', 'admin'],
    default: 'user'
  },
  greenCoins: {
    type: Number,
    default: 50 // Welcome bonus
  },
  totalEarnings: {
    type: Number,
    default: 0
  },
  totalScrapKg: {
    type: Number,
    default: 0
  },
  totalPickups: {
    type: Number,
    default: 0
  },
  co2Saved: {
    type: Number,
    default: 0
  },
  avatar: {
    type: String,
    default: ''
  },
  streak: {
    current: { type: Number, default: 0 },
    longest: { type: Number, default: 0 },
    lastPickupDate: { type: Date }
  },
  badges: [{
    name: String,
    icon: String,
    earnedAt: { type: Date, default: Date.now }
  }],
  referralCode: {
    type: String,
    unique: true
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Encrypt password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  
  // Generate referral code
  if (!this.referralCode) {
    this.referralCode = this.name.substring(0, 3).toUpperCase() + 
      Math.random().toString(36).substring(2, 7).toUpperCase();
  }
  next();
});

// Match password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
