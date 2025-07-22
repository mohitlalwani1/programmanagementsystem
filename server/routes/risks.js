const express = require('express');
const Risk = require('../models/Risk');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all risks
router.get('/', auth, async (req, res) => {
  try {
    const risks = await Risk.find()
      .populate('owner', 'name email')
      .populate('project', 'name')
      .populate('program', 'name')
      .sort({ createdAt: -1 });

    res.json(risks);
  } catch (error) {
    console.error('Get risks error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single risk
router.get('/:id', auth, async (req, res) => {
  try {
    const risk = await Risk.findById(req.params.id)
      .populate('owner', 'name email avatar')
      .populate('project', 'name')
      .populate('program', 'name');

    if (!risk) {
      return res.status(404).json({ message: 'Risk not found' });
    }

    res.json(risk);
  } catch (error) {
    console.error('Get risk error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new risk
router.post('/', auth, async (req, res) => {
  try {
    const riskData = {
      ...req.body,
      createdBy: req.user._id
    };

    const risk = new Risk(riskData);
    await risk.save();

    const populatedRisk = await Risk.findById(risk._id)
      .populate('owner', 'name email')
      .populate('project', 'name')
      .populate('program', 'name');

    res.status(201).json({
      message: 'Risk created successfully',
      risk: populatedRisk
    });
  } catch (error) {
    console.error('Create risk error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update risk
router.put('/:id', auth, async (req, res) => {
  try {
    const risk = await Risk.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('owner', 'name email')
     .populate('project', 'name')
     .populate('program', 'name');

    if (!risk) {
      return res.status(404).json({ message: 'Risk not found' });
    }

    res.json({
      message: 'Risk updated successfully',
      risk
    });
  } catch (error) {
    console.error('Update risk error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete risk
router.delete('/:id', auth, authorize('admin', 'manager'), async (req, res) => {
  try {
    const risk = await Risk.findByIdAndDelete(req.params.id);

    if (!risk) {
      return res.status(404).json({ message: 'Risk not found' });
    }

    res.json({ message: 'Risk deleted successfully' });
  } catch (error) {
    console.error('Delete risk error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;