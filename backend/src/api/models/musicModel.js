const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let musicSchema = new Schema({
    link: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        default: "https://pbs.twimg.com/media/F18E6IhacAAu2h6.png",
    },
    submitted_at: {
        type: Date,
        default: Date.now,
    },
    session: {
        type: Schema.Types.ObjectId,
        ref: 'Session'
    }
});

const Music = mongoose.model('Music', musicSchema);

module.exports = Music;
