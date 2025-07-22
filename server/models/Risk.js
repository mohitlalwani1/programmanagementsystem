const mongoose = require('mongoose');

const riskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Risk title is required'],
    trim: true,
    maxlength: [200, 'Risk title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Risk description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    enum: ['technical', 'financial', 'operational', 'strategic'],
    required: [true, 'Risk category is required']
  },
  probability: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: [true, 'Risk probability is required']
  },
  impact: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: [true, 'Risk impact is required']
  },
  status: {
    type: String,
    enum: ['identified', 'assessed', 'mitigated', 'closed'],
    default: 'identified'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Risk owner is required']
  },
  mitigation: {
    type: String,
    required: [true, 'Mitigation plan is required'],
    trim: true,
    maxlength: [1000, 'Mitigation plan cannot exceed 1000 characters']
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Program'
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Calculate risk score
riskSchema.virtual('riskScore').get(function() {
  const probScore = this.probability === 'high' ? 3 : this.probability === 'medium' ? 2 : 1;
  const impactScore = this.impact === 'high' ? 3 : this.impact === 'medium' ? 2 : 1;
  return probScore * impactScore;
});

module.exports = mongoose.model('Risk', riskSchema);