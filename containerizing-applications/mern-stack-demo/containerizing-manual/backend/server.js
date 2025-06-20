const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/feedbackdb');

const Feedback = mongoose.model('Feedback', { message: String });

app.post('/feedback', async (req, res) => {
  const fb = new Feedback({ message: req.body.message });
  await fb.save();
  res.json({ status: 'Saved' });
});

app.get('/feedback', async (req, res) => {
  const feedbacks = await Feedback.find();
  res.json(feedbacks);
});

app.listen(5000, () => console.log('Backend on port 5000'));
