const Video = require('../models/Video');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

// 1. Upload video and run real AI analysis
exports.uploadVideo = async (req, res) => {
  try {
    const filePath = req.file.path;

    // Send video to Flask AI backend
    const formData = new FormData();
    formData.append('video', fs.createReadStream(filePath));

    const aiResponse = await axios.post('http://localhost:5001/analyze', formData, {
      headers: formData.getHeaders(),
    });

    // Save to MongoDB
    const newVideo = new Video({
      filename: req.file.filename,
      originalname: req.file.originalname,
      uploadDate: new Date(),
      analysis: {
        status: aiResponse.data.status,
        confidence: aiResponse.data.confidence,
        reasons: aiResponse.data.reasons,
        perFrame: aiResponse.data.perFrame,
        analyzedAt: new Date(),
      },
    });

    const saved = await newVideo.save();

    // Delete uploaded file from disk after analysis (optional)
    fs.unlinkSync(filePath);

    return res.status(200).json({
      message: 'Video uploaded and analyzed successfully',
      video: saved,
    });
  } catch (err) {
    console.error('Upload or AI failed:', err.message);
    return res.status(500).json({
      error: 'Upload or AI analysis failed',
      details: err.message,
    });
  }
};

// 2. Re-analyze existing video by ID
exports.analyzeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });

    const filePath = path.join(__dirname, '..', 'uploads', video.filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Video file missing on server' });
    }

    const formData = new FormData();
    formData.append('video', fs.createReadStream(filePath));

    const aiResponse = await axios.post('http://localhost:5001/analyze', formData, {
      headers: formData.getHeaders(),
    });

    video.analysis = {
      status: aiResponse.data.status,
      confidence: aiResponse.data.confidence,
      reasons: aiResponse.data.reasons,
      perFrame: aiResponse.data.perFrame,
      analyzedAt: new Date(),
    };

    await video.save();

    return res.json({ message: 'Re-analysis complete', video });
  } catch (err) {
    console.error('Re-analysis failed:', err.message);
    return res.status(500).json({
      error: 'Re-analysis failed',
      details: err.message,
    });
  }
};

// 3. Get all analyzed videos
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ uploadDate: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history', details: err.message });
  }
};

// 4. Get one by ID
exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.json(video);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch video', details: err.message });
  }
};
