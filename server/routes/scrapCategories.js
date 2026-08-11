const express = require('express');
const router = express.Router();
const ScrapCategory = require('../models/ScrapCategory');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/scrap-categories
router.get('/', async (req, res) => {
  try {
    const categories = await ScrapCategory.find({ isActive: true }).sort({ name: 1 });
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/scrap-categories (Admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const category = await ScrapCategory.create(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/scrap-categories/:id (Admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const category = await ScrapCategory.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
