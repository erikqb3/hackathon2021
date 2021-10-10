const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    numSentences: {
        type: Number,
        required: true
    }
});

userSchema.methods.addSentence = function () {
    this.numSentences = numSentances++;
    return this.save()
}

module.exports = mongoose.model('User', userSchema)