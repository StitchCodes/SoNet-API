const { User, Thoughts } = require('../models');


module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
          .then((users) => res.json(users))
          .catch((err) => res.status(500).json(err));
          
          
      },
    // Get single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v')
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
    // POST NEW USER
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // PUT UPDATE USER
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true}
        )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with this id!'})
                : res.json(user)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        }

        )
    },
    // DELETE USER
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : Thoughts.deleteMany({ _id: { $in: user.thoughts } })
          )
          .then(() => res.json({ message: 'User and user thoughts deleted!' }))
          .catch((err) => res.status(500).json(err));
      }
};