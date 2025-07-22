const express = require('express');
const Program = require('../models/Program');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all programs
router.get('/', auth, async (req, res) => {
  try {
    const programs = await Program.find()
      .populate('manager', 'name email')
      .populate('projects', 'name status')
      .populate('risks', 'title status')
      .sort({ createdAt: -1 });

    res.json(programs);
  } catch (error) {
    console.error('Get programs error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single program
router.get('/:id', auth, async (req, res) => {
  try {
    const program = await Program.findById(req.params.id)
      .populate('manager', 'name email avatar')
      .populate('projects', 'name status progress')
      .populate('risks', 'title status category');

    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    res.json(program);
  } catch (error) {
    console.error('Get program error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new program
router.post('/', auth, authorize('admin', 'manager'), async (req, res) => {
  try {
    const programData = {
      ...req.body,
      createdBy: req.user._id
    };

    const program = new Program(programData);
    await program.save();

    const populatedProgram = await Program.findById(program._id)
      .populate('manager', 'name email');

    res.status(201).json({
      message: 'Program created successfully',
      program: populatedProgram
    });
  } catch (error) {
    console.error('Create program error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update program
router.put('/:id', auth, authorize('admin', 'manager'), async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('manager', 'name email');

    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    res.json({
      message: 'Program updated successfully',
      program
    });
  } catch (error) {
    console.error('Update program error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete program
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);

    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    res.json({ message: 'Program deleted successfully' });
  } catch (error) {
    console.error('Delete program error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;