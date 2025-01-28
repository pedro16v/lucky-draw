/**
 * index.js
 */
const express = require('express');
const path = require('path');
const morgan = require('morgan');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Add logging middleware
app.use(morgan(':remote-addr - :method :url :status :response-time ms'));

// Track IPs and their drawn concepts
const userDraws = new Map();

// Middleware to get IPv4 address and check previous draws
const getIPv4 = (req, res, next) => {
  let ip = req.ip;
  
  // Special handling for localhost
  if (ip === '::1') {
    ip = '127.0.0.1';
  }
  // Handle potential IPv6 format like ::ffff:192.168.1.1
  else if (ip.includes('::ffff:')) {
    ip = ip.split(':').pop();
  }
  
  // If still not IPv4, reject the request
  if (!ip.match(/^\d+\.\d+\.\d+\.\d+$/)) {
    return res.status(400).json({ error: 'IPv4 address required' });
  }
  
  req.ipv4 = ip;
  next();
};

// Organize concepts by type with their associated colors
const conceptTypes = {
  timor: {
    color: '#00AB55', // green
    concepts: ['Tais', 'Crocodile', 'Uma Lulik', 'Coffee', 'Atauro', 'Rice', 'Tetum']
  },
  entrepreneurship: {
    color: '#2065D1', // blue
    concepts: ['Idea', 'Mentor', 'Prototype', 'Pitch', 'Risk', 'Sales', 'Innovation']
  },
  youth: {
    color: '#FF5630', // orange
    concepts: ['Energy', 'Dreams', 'Knowledge', 'Friends', 'Future', 'Talent', 'Play']
  },
  sustainability: {
    color: '#FFB400', // yellow
    concepts: ['Environment', 'Renewable', 'Recycling', 'Conservation', 'Climate', 'Green Energy', 'Biodiversity']
  }
};

// Flatten concepts for drawing while keeping track of their type
let concepts = Object.entries(conceptTypes).flatMap(([type, data]) => 
  data.concepts.map(concept => ({ concept, type }))
);

// Uncomment and modify the static files middleware
app.use(express.static('public'));

// Route: Home page – serves a simple HTML with a button to draw a concept
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Add new route to check user's status
app.get('/status', getIPv4, (req, res) => {
  const userIP = req.ipv4;
  const previousDraw = userDraws.get(userIP);
  
  if (previousDraw) {
    res.json({
      drawn: true,
      ...previousDraw
    });
  } else {
    res.json({
      drawn: false,
      remaining: concepts.length
    });
  }
});

// Update draw route to store results
app.get('/draw', getIPv4, (req, res) => {
  const userIP = req.ipv4;
  
  // Check if user has already drawn
  const previousDraw = userDraws.get(userIP);
  if (previousDraw) {
    console.log(`[${new Date().toISOString()}] User ${userIP} attempted to draw again but was blocked`);
    return res.status(403).json({ 
      error: 'You have already drawn a concept',
      remaining: concepts.length
    });
  }
  
  if (concepts.length === 0) {
    console.log(`[${new Date().toISOString()}] User ${userIP} attempted to draw, but no concepts remain`);
    return res.json({ concept: null });
  }
  
  const randomIndex = Math.floor(Math.random() * concepts.length);
  const selectedItem = concepts.splice(randomIndex, 1)[0];
  
  // Store the user's draw
  const drawResult = {
    concept: selectedItem.concept,
    type: selectedItem.type,
    color: conceptTypes[selectedItem.type].color,
    remaining: concepts.length
  };
  userDraws.set(userIP, drawResult);
  
  console.log(`[${new Date().toISOString()}] User ${userIP} drew concept: "${selectedItem.concept}". ${concepts.length} concepts remaining`);
  
  res.json(drawResult);
});

// Test route that allows unlimited draws
app.get('/test/draw', getIPv4, (req, res) => {
  const userIP = req.ipv4;
  
  if (concepts.length === 0) {
    console.log(`[${new Date().toISOString()}] Test user ${userIP} attempted to draw, but no concepts remain`);
    return res.json({ concept: null });
  }
  
  const randomIndex = Math.floor(Math.random() * concepts.length);
  const selectedItem = concepts.splice(randomIndex, 1)[0];
  
  const drawResult = {
    concept: selectedItem.concept,
    type: selectedItem.type,
    color: conceptTypes[selectedItem.type].color,
    remaining: concepts.length
  };
  
  console.log(`[${new Date().toISOString()}] Test user ${userIP} drew concept: "${selectedItem.concept}". ${concepts.length} concepts remaining`);
  
  res.json(drawResult);
});

// Serve the test page
app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'test.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
