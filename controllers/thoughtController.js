const { User, Thoughts } = require('../models');
const userController = require('./userController');

module.exports = {
    // GET ALL THOUGHTS
    getThoughts(req, res) {
        Thoughts.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // GET SINGLE TOHOUGHT
    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtId })
            .then((thought) => 
                !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // POST THOUGHT
    createThought(req, res) {
        Thoughts.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id }},
                    { new: true }
                );
            })
            .then((user) => 
            !user
                ? res.status(404).json({
                    message: 'Thought created, but no user with that ID',
                })
                : res.json('Thought Created! 🎉')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // PUT THOUGHT
    updateThought(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
            ? res.status(404).jsonn({ message: 'No thought with that id!'})
            : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // DELETE THOUGHT
    deleteThought(req, res) {
        Thoughts.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought with that id!'})
                : User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId }},
                    { new: true }
                )
            )
            .then((user) => 
                !user
                    ? res.status(404).json({
                        message: 'Thought deleted but no user with that id!',
                    })
                    : res.json({ message: 'Thought successfully removed!'})
            )
            .catch((err) => res.status(500).json(err));
    },
};