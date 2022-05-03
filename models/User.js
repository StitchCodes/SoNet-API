const { Schema, model } = require('mongoose');
const thoughtsSchema = require('./Thoughts');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [thoughtsSchema]
    }, 
    {toJSON: {
        getters: true
        },
    }
)
//User:

    // thoughts
        // Array of _id values referencing the Thought model

    // friends
        // Array of _id values referencing the User model (self-reference)

// Schema Settings:
// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

const User = model('user', userSchema);

module.exports = User;