const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    publishYear: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
}, { timestamps: true });

module.exports = model('movie', movieSchema);