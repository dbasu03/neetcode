const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Secret for JWT
const JWT_SECRET = "your_jwt_secret";

// In-memory storage
const users = [];
const problems = [];

// Utility function to authenticate
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token.split(' ')[1], JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
};

// Routes


// Home 
app.get('/', (req, res) => {
  res.send('Neetcode home page')
})

// Register
app.post('/auth/register', async (req, res) => {
  const { username, password } = req.body;

  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: 'User registered' });
});

// Login
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Get Problems
app.get('/problems', (req, res) => {
  res.json(problems);
});

// Add Problem (Admin only)
app.post('/problems', authenticateToken, (req, res) => {
  if (req.user.username !== 'admin') {
    return res.status(403).json({ message: 'Only admins can add problems' });
  }

  const { title, description, examples, difficulty } = req.body;
  problems.push({ id: problems.length + 1, title, description, examples, difficulty });
  res.status(201).json({ message: 'Problem added' });
});

// Get Single Problem
app.get('/problems/:id', (req, res) => {
  const problem = problems.find(p => p.id === parseInt(req.params.id));
  if (!problem) return res.status(404).json({ message: 'Problem not found' });
  res.json(problem);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
