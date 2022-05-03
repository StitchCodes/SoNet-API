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
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }],
        friends: [User]
    }, 
    {toJSON: {
        virtuals: true,
        getters: true
        },
    }
);

userSchema
    .virtual('friendCount')
    .get(function () {
        return `${this.friends.length}`;
    });

    // friends
        // Array of _id values referencing the User model (self-reference)

const User = model('user', userSchema);

module.exports = User;