var mongoose = require('../lib/mongoose');

var Schema = mongoose.Schema;

var portfolioSchema = new Schema({
    name: String,
    note: String,
    filePath: String,
    link: String,
    slideNumber: Number,
    filePath: String,
    fileContent: String
});

portfolioSchema.statics.findBySlide = function(slide, cb){
    return this.model('Portfolio').find({slideNumber:slide}, cb);
};

var Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;