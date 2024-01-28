const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require('moment');

let sessionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        default: Date.now,
    },
    end_at: {
        type: Date,
        default: () => moment().endOf('day').toDate(),
    },
    vote_ended: {
        type: Boolean,
        default: false,
    },

});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;