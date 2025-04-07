const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'http://localhost:8081' })); // Updated port for HTML server
app.use(bodyParser.json());

const filePath = './users.json';

// Initialize the file if it doesn't exist
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

// Route to handle user input and store it in a file
app.post('/api', (req, res) => {
  console.log('Request received:', req.body);
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and Email are required' });
  }

  const newUser = { name, email };

  // Read current data
  const data = JSON.parse(fs.readFileSync(filePath));

  // Add new user
  data.push(newUser);

  // Save updated data
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  res.status(201).json({ message: 'User saved successfully', user: newUser });
});

// Route to get all users
app.get('/api/users', (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  res.json(data);
});

// Start server
app.listen(5000, () => { // Updated port
  console.log('Server is running on http://localhost:5000');
});
