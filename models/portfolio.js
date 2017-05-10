const mongoose = require('../lib/mongoose');

var Schema = mongoose.Schema;

var portfolioSchema = new Schema({
    name: String,
    note: String,
    portfolioType: String,
    fileLink: String,
    coverLink: String,
    slideNumber: Number,
    original_filename: String,
    cover_original_filename: String
});

portfolioSchema.statics.findBySlide = function(slide, cb){
    return this.model('Portfolio').find({
        slideNumber:slide
    }, cb);
};

var Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;