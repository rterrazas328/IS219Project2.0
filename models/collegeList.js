var mongoose = require('mongoose');
var Schema = mongoose.Schema;

collegeRecordSchema = new Schema({
	varnumber: Number,
	varname: String,
	DataType: String,
	Fieldwidth: Number,
	format: String,
	varTitle: String
});

collegeSchema = new Schema({
	_id: String,
	UNITID: String,
	INSTNM: String
});

//Need to use this model to findOne() because 'college model's returned object's _id is overwritten by the schema's
collegeLookupSchema = new Schema({
	TESTLBL: String
});

//models to answer questions 1, 2, & 3
collegeEnrollmentSchema = new Schema({
	UNITID: String,
	'institution name' : String,
	'Grand total' : Number
});
collegeMFSchema = new Schema({
	UNITID: String,
	'institution name' : String,
	'Grand total men' : Number,
	'Grand total women' : Number

});
collegeTuitionDeltaSchema = new Schema({
	UNITID: String,
	'institution name' : String,
	'Out-of-state tuition and fees 2010-11' : Number,
	'Out-of-state tuition and fees 2013-14': Number

});//*/

//both models use same collection

mongoose.model('record', collegeRecordSchema, 'collegeVarDetails');//change collection name, import data and create collection

mongoose.model('college', collegeSchema, 'collegeDocs');

mongoose.model('lookup', collegeLookupSchema, 'collegeDocs');

mongoose.model('enrolled', collegeEnrollmentSchema, 'enrollment');
mongoose.model('male_female', collegeMFSchema, 'enrollment');
mongoose.model('tuition', collegeTuitionDeltaSchema, 'tuition');//*/