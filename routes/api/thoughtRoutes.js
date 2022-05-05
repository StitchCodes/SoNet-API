const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtController');
const { create } = require('../../models/Thoughts');

// Route for api/thoughts
router.route('/').get(getThoughts).post(createThought);

// Route for api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// Reactions route

module.exports = router;