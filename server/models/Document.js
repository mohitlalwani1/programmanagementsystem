const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Document name is required'],
    trim: true,
    maxlength: [200, 'Document name cannot exceed 200 characters']
  },
  type: {
    type: String,
    enum: ['requirement', 'design', 'test', 'report', 'other'],
    required: [true, 'Document type is required']
  },
  version: {
    type: String,
    required: [true, 'Document version is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Uploader is required']
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Project is required']
  },
  url: {
    type: String,
    required: [true, 'Document URL is required']
  },
  size: {
    type: Number,
    required: [true, 'Document size is required'],
    min: [0, 'Size cannot be negative']
  },
  mimeType: {
    type: String,
    required: [true, 'MIME type is required']
  },
  status: {
    type: String,
    enum: ['draft', 'review', 'approved', 'archived'],
    default: 'draft'
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Document', documentSchema);