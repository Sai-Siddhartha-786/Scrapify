const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const User = require('../models/User');
const ScrapCategory = require('../models/ScrapCategory');
const { protect, authorize } = require('../middleware/auth');

// @route   POST /api/bookings
router.post('/', protect, async (req, res) => {
  try {
    const { scrapItems, pickupAddress, scheduledDate, scheduledSlot, paymentMethod, notes } = req.body;

    // Validate scrap items and calculate estimates
    let totalEstimatedWeight = 0;
    const processedItems = [];

    for (const item of scrapItems) {
      const category = await ScrapCategory.findById(item.category);
      if (!category) {
        return res.status(400).json({ success: false, message: `Invalid scrap category: ${item.category}` });
      }
      processedItems.push({
        category: category._id,
        categoryName: category.name,
        estimatedWeight: item.estimatedWeight,
        ratePerKg: category.ratePerKg
      });
      totalEstimatedWeight += item.estimatedWeight;
    }

    const booking = await Booking.create({
      user: req.user._id,
      scrapItems: processedItems,
      pickupAddress,
      scheduledDate,
      scheduledSlot,
      totalEstimatedWeight,
      paymentMethod,
      notes
    });

    // Award booking bonus coins
    const user = await User.findById(req.user._id);
    user.greenCoins += 20; // Bonus for booking
    
    // Streak logic
    const now = new Date();
    const lastPickup = user.streak.lastPickupDate;
    if (lastPickup) {
      const daysDiff = Math.floor((now - lastPickup) / (1000 * 60 * 60 * 24));
      if (daysDiff <= 30) {
        user.streak.current += 1;
        if (user.streak.current > user.streak.longest) {
          user.streak.longest = user.streak.current;
        }
        // Streak bonus
        if (user.streak.current % 3 === 0) {
          user.greenCoins += 50;
          booking.bonusCoins = 50;
        }
      } else {
        user.streak.current = 1;
      }
    } else {
      user.streak.current = 1;
    }
    user.streak.lastPickupDate = now;
    await user.save();

    await booking.populate('scrapItems.category', 'name icon ratePerKg color');

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/bookings
router.get('/', protect, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = { user: req.user._id };
    if (status) query.status = status;

    const bookings = await Booking.find(query)
      .populate('agent', 'name phone')
      .populate('scrapItems.category', 'name icon ratePerKg color')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      data: bookings,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/bookings/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('agent', 'name phone rating')
      .populate('scrapItems.category', 'name icon ratePerKg color');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/bookings/:id/complete (Agent completes pickup)
router.put('/:id/complete', protect, authorize('agent', 'admin'), async (req, res) => {
  try {
    const { scrapItems, totalActualWeight } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Update actual weights and calculate amounts
    let totalAmount = 0;
    let totalGreenCoins = 0;

    for (const item of scrapItems) {
      const category = await ScrapCategory.findById(item.category);
      const amount = item.actualWeight * category.ratePerKg;
      totalAmount += amount;
      totalGreenCoins += item.actualWeight * category.greenCoinsPerKg;
    }

    booking.scrapItems = scrapItems;
    booking.totalActualWeight = totalActualWeight;
    booking.totalAmount = totalAmount;
    booking.greenCoinsEarned = totalGreenCoins;
    booking.status = 'completed';
    booking.completedAt = new Date();
    booking.paymentStatus = 'completed';

    await booking.save();

    // Update user stats
    const user = await User.findById(booking.user);
    user.totalEarnings += totalAmount;
    user.totalScrapKg += totalActualWeight;
    user.totalPickups += 1;
    user.co2Saved += totalActualWeight * 0.5;
    user.greenCoins += totalGreenCoins;

    // Badge checks
    if (user.totalPickups >= 5 && !user.badges.find(b => b.name === 'Regular Recycler')) {
      user.badges.push({ name: 'Regular Recycler', icon: '♻️' });
    }
    if (user.totalPickups >= 25 && !user.badges.find(b => b.name === 'Eco Warrior')) {
      user.badges.push({ name: 'Eco Warrior', icon: '🌍' });
    }
    if (user.totalScrapKg >= 100 && !user.badges.find(b => b.name === 'Century Club')) {
      user.badges.push({ name: 'Century Club', icon: '💯' });
    }
    if (user.totalScrapKg >= 500 && !user.badges.find(b => b.name === 'Half Ton Hero')) {
      user.badges.push({ name: 'Half Ton Hero', icon: '🏆' });
    }

    await user.save();

    res.json({ success: true, data: booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/bookings/:id/cancel
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (['completed', 'cancelled'].includes(booking.status)) {
      return res.status(400).json({ success: false, message: 'Cannot cancel this booking' });
    }

    booking.status = 'cancelled';
    booking.cancelledAt = new Date();
    booking.cancellationReason = req.body.reason || 'Cancelled by user';
    await booking.save();

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/bookings/:id/rate
router.put('/:id/rate', protect, async (req, res) => {
  try {
    const { score, review } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking || booking.status !== 'completed') {
      return res.status(400).json({ success: false, message: 'Can only rate completed bookings' });
    }

    booking.rating = { score, review, ratedAt: new Date() };
    await booking.save();

    // Bonus coins for rating
    const user = await User.findById(req.user._id);
    user.greenCoins += 5;
    await user.save();

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/bookings/stats/me
router.get('/stats/me', protect, async (req, res) => {
  try {
    const stats = await Booking.aggregate([
      { $match: { user: req.user._id, status: 'completed' } },
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          totalWeight: { $sum: '$totalActualWeight' },
          totalEarnings: { $sum: '$totalAmount' },
          totalGreenCoins: { $sum: '$greenCoinsEarned' },
          avgRating: { $avg: '$rating.score' }
        }
      }
    ]);

    // Monthly breakdown
    const monthly = await Booking.aggregate([
      { $match: { user: req.user._id, status: 'completed' } },
      {
        $group: {
          _id: { $month: '$completedAt' },
          weight: { $sum: '$totalActualWeight' },
          earnings: { $sum: '$totalAmount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      success: true,
      data: {
        overview: stats[0] || { totalBookings: 0, totalWeight: 0, totalEarnings: 0, totalGreenCoins: 0 },
        monthly
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
