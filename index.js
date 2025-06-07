const { signup, login } = require('./controllers/authController');
const dotenv = require('dotenv')
const express = require('express');
const mongoose = require('mongoose');
dotenv.config()
const PORT = process.env.PORT || 5000
const app = express();
app.use(express.json());
app.post('/ping', (req, res) => {
  const { email } = req.body
  return res.status(200).json({ message: email })
})
app.post('/signup', signup);
app.use('/login', login);
app.use('/books', require('./routes/bookRoutes'));
app.use('/reviews', require('./routes/reviewRoutes'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log('Server running on port', PORT));
  })
  .catch(console.error);
