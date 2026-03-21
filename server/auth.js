require('dotenv').config({ path: './server/.env' });
const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // not necessary!

app.get('/', (req, res) => {
  res.send('Be calm! Everything is working!');
});

app.post('/post-login', authenticateToken, (req, res) => {
  res.json({
    message: 'Welcome Admin',
    user: req.user,
  });
});

app.post('/betage_postreqver', (req, res) => {
  const { password, login } = req.body;
  // empty fields check
  if (!login.trim() || !password.trim()) {
    return res.json({
      success: false,
      message: 'Fields cannot be empty',
    });
  }
  // wrong credentials check
  if (
    login !== process.env.ADMIN_LOGIN ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.json({
      success: false,
      message: 'Wrong login or password',
    });
  }

  const token = jwt.sign(
    {
      role: 'admin',
      login,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );
  return res.json({ success: true, token });
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
