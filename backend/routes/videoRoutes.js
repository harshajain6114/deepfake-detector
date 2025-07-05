const express = require('express');
const router = express.Router();
const {
  uploadVideo,
  analyzeVideo,
  getAllVideos,
  getVideoById
} = require('../controllers/videoController');
const multer = require('multer');
const path = require('path');

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// 📌 ROUTES

// 1. Upload video
router.post('/upload', upload.single('video'), uploadVideo);

// // 2. Analyze video using AI backend
// router.post('/analyze/:id', analyzeVideo);

// 3. Fetch all videos
router.get('/history', getAllVideos);

// 4. Get one video
router.get('/:id', getVideoById);

module.exports = router;
