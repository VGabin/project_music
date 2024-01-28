const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let voteSchema = new Schema({
    rating: {
        type: Number,
        required: true,
        min: [1, "Vous ne pouvez pas noter en dessous de 1"],
        max: [5, "Vous ne pouvez pas noter au dessus de 5"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    music: {
        type: Schema.Types.ObjectId,
        ref: 'Music',
        required: true,
    }
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
