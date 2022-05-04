const { Schema, model } = require('mongoose');
const userSchema = require('./User');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        thoughtAuthor: {
            type: String,
            required: true,
        },
    }
)

// createdAt
    // Use a getter method to format the timestamp on query


// reactions (These are like replies)
    // Array of nested documents created with the reactionSchema

// Schema Settings:
    // Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

const Thoughts = model('thought', thoughtSchema);

module.exports = Thoughts;