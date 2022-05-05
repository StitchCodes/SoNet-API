const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/userController');

// ROUTE FOR /api/users
router.route('/').get(getUsers).post(createUser);

// Route for /api/users/:userId
router.route('/:userId').get(getSingleUser);

// Friend route

module.exports = router;