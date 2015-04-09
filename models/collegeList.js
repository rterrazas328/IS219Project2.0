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
	INSTNM: String
});

//Need to use this model to findOne() because 'college model's returned object's _id is overwritten by the schema's
collegeLookupSchema = new Schema({
	TESTLBL: String
});

//both models use same collection

mongoose.model('record', collegeRecordSchema, 'collegeVarDetails');//change collection name, import data and create collection

mongoose.model('college', collegeSchema, 'collegeDocs');

mongoose.model('lookup', collegeLookupSchema, 'collegeDocs');
