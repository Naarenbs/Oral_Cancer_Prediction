const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
       
        cb(null, Date.now() + '-' + file.originalname); 
    }
});


const upload = multer({ storage: storage }); 


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use(express.static(path.join(__dirname, '../dist/demo')));


const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const reviewSchema = new Schema({
  name: String,
  role: String,
  rating: Number,
  comment: String,
  date: { type: Date, default: Date.now },
  avatar: String
});

const detectionSchema = new Schema({
  userId: String,
  prediction: String,
  confidence: Number,
  recommendations: [String],
  timestamp: { type: Date, default: Date.now }
});

const User = model('User', userSchema);
const Review = model('Review', reviewSchema);
const Detection = model('Detection', detectionSchema);

app.post('/api/auth/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ 
      firstName, 
      lastName, 
      email, 
      password: hashedPassword 
    });
    await newUser.save();

    const { password: _, ...userResponse } = newUser.toObject();
    res.status(201).json({ user: userResponse, message: 'User created successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during registration' });
  }
});


app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "mySecretKey",
      { expiresIn: "1h" }
    );

    const { password: _, ...userResponse } = user.toObject();
    res.json({ token, user: userResponse, message: 'Login successful' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

function authMiddleware(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; 
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mySecretKey");
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

app.post('/api/detect', authMiddleware, async (req, res) => {
  const { imageData } = req.body;
  const userId = req.user.id; 

  setTimeout(async () => {
    const confidence = Math.random();
    const isHighRisk = confidence > 0.7;

    const result = new Detection({
      userId,
      prediction: isHighRisk ? 'High Risk' : 'Low Risk',
      confidence,
      recommendations: isHighRisk ? [
        'Consult with an oncologist immediately',
        'Schedule a biopsy for definitive diagnosis',
        'Avoid tobacco and alcohol consumption',
        'Maintain good oral hygiene'
      ] : [
        'Continue regular dental checkups',
        'Maintain good oral hygiene',
        'Monitor for any changes',
        'Follow up in 6 months'
      ]
    });

    await result.save();
    res.json(result);
  }, 2000);
});

app.post("/api/ai/predict",upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      console.log("⚠ No file received from Angular");
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("📤 Received file from Angular:", req.file.originalname, req.file.mimetype, req.file.size);

    const formData = new FormData();
    formData.append("file", req.file.buffer, req.file.originalname);

    console.log("➡ Forwarding file to Flask ML API...");
    const response = await axios.post("http://localhost:8000/predict/", formData, {
      headers: formData.getHeaders(),
    });

    console.log("✅ Flask Response Received:", response.data);
    res.json(response.data);

  } catch (error) {
    console.error("❌ Prediction Error in Node:", error.message);
    if (error.response) {
      console.error("Flask Error Response:", error.response.data);
    }
    res.status(500).json({ error: "Failed to communicate with ML service" });
  }
});


app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch reviews' });
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    const { name, role, rating, comment } = req.body;
    const newReview = new Review({
      name,
      role,
      rating,
      comment,
      avatar: `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=100&h=100&fit=crop&crop=face`
    });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: 'Could not post review' });
  }
});


app.get('/api/user/:userId/detections', authMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId;
    if (req.user.id !== userId) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    const userDetections = await Detection.find({ userId });
    res.json(userDetections);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch user detections' });
  }
});

app.get('/api/health', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalReviews = await Review.countDocuments();
    const totalDetections = await Detection.countDocuments();

    res.json({
      status: 'OK',
      timestamp: new Date(),
      stats: { totalUsers, totalReviews, totalDetections }
    });
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: 'Could not fetch stats' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/demo/index.html'));
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
