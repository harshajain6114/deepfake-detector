const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalname: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  analysis: {
    status: { type: String, enum: ['FAKE', 'REAL'] },
    confidence: Number,
    reasons: [String],
    perFrame: [
      {
        frame: Number,
        confidence: Number,
      }
    ],
    analyzedAt: { type: Date, default: Date.now },
  },
});

module.exports = mongoose.model('Video', videoSchema);
