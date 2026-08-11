const express = require('express');
const router = express.Router();
const { Reward, Redemption } = require('../models/Reward');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// @route   GET /api/rewards
router.get('/', async (req, res) => {
  try {
    const rewards = await Reward.find({ isActive: true }).sort({ coinsRequired: 1 });
    res.json({ success: true, data: rewards });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/rewards/:id/redeem
router.post('/:id/redeem', protect, async (req, res) => {
  try {
    const reward = await Reward.findById(req.params.id);
    if (!reward || !reward.isActive) {
      return res.status(404).json({ success: false, message: 'Reward not found' });
    }

    const user = await User.findById(req.user._id);
    if (user.greenCoins < reward.coinsRequired) {
      return res.status(400).json({ success: false, message: 'Insufficient Green Coins' });
    }

    if (reward.stock !== -1 && reward.stock <= 0) {
      return res.status(400).json({ success: false, message: 'Reward out of stock' });
    }

    // Deduct coins
    user.greenCoins -= reward.coinsRequired;
    await user.save();

    // Update stock
    if (reward.stock !== -1) {
      reward.stock -= 1;
      await reward.save();
    }

    // Create redemption
    const code = 'GC' + Math.random().toString(36).substring(2, 10).toUpperCase();
    const redemption = await Redemption.create({
      user: user._id,
      reward: reward._id,
      coinsSpent: reward.coinsRequired,
      code,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    });

    res.json({
      success: true,
      data: {
        redemption,
        remainingCoins: user.greenCoins
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/rewards/my-redemptions
router.get('/my-redemptions', protect, async (req, res) => {
  try {
    const redemptions = await Redemption.find({ user: req.user._id })
      .populate('reward')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: redemptions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
