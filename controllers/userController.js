const { User, Thoughts } = require('../models');


module.exports = {
    // Get all users
    getUsers(rew, res) {
        User.find()
            .then(async (users) => {
                return res.json(users);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Get single user
    
}