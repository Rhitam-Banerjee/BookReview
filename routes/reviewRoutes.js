const express = require('express');
const auth = require('../middleware/auth');
const { updateReview, deleteReview } = require('../controllers/reviewController');

const router = express.Router();

router.put('/:id', auth, updateReview);
router.delete('/:id', auth, deleteReview);

module.exports = router;
