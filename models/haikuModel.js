var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var haikuSchema = new Schema({
	'line1' : String,
	'line2' : String,
	'line3' : String,
	'author' : String
});

haikuSchema.plugin(require('mongoose-paginate'));

module.exports = mongoose.model('haiku', haikuSchema);
