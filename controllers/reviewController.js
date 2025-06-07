const Review = require('../models/Review');
const Book = require('../models/Book');

exports.addReview = async (req, res) => {
  const review = new Review({
    ...req.body,
    book: req.params.id,
    user: req.user._id
  });
  await review.save();
  await Book.findByIdAndUpdate(req.params.id, { $push: { reviews: review._id } });
  res.status(201).json(review);
};

exports.updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || !review.user.equals(req.user._id))
    return res.status(403).json({ error: 'Forbidden' });

  Object.assign(review, req.body);
  await review.save();
  res.json(review);
};

exports.deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || !review.user.equals(req.user._id))
    return res.status(403).json({ error: 'Forbidden' });

  await Book.findByIdAndUpdate(review.book, { $pull: { reviews: review._id } });
  await review.remove();
  res.json({ message: 'Review deleted' });
};
