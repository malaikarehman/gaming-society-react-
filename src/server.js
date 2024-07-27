const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Member = require('./models/Member'); // Import the Member model

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { fullname, email, phone, password } = req.body;

  try {
    // Check if email already exists
    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create a new member with role 'member'
    const newMember = new Member({
      fullname,
      email,
      phone,
      password,
      role: 'member'
    });

    await newMember.save();
    res.status(201).json({ message: 'Signup successful', newMember });
  } catch (error) {
    console.error('Error during signup', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Signin endpoint (basic example)
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const member = await Member.findOne({ email, password });
    if (!member) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Signin successful', member });
  } catch (error) {
    console.error('Error during signin', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
