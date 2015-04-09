var mongoose = require('mongoose');
var events = require('events');
var eventEmitter = new events.EventEmitter;
var csv = require('csv');
var fs = require('fs');
require('../models/CollegeList');

var records = new Array();
var records = [];

//Connect to mongoDB
mongoose.connect('mongodb://localhost:27017/IS219');
var db = mongoose.connection;

console.log("loading models...");
var CollegeList = mongoose.model('college');
var CollegeRecord = mongoose.model('record');
var CollegeLookup = mongoose.model('lookup');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("Successfully connected to MongoDB");// yay!
});


function importAndParseFile(fnPath, collName){
	//console.log("Path: " + __dirname + '/' + fnPath);
	console.log("Path: " + fnPath);
   csv(records).from.stream(fs.createReadStream(fnPath), {
      columns: true
   }).on('record', function (row, index) {
      records.push(row);
      //console.log(row); push an array
   }).on('end', function (count) {
      var MongoClient = require('mongodb').MongoClient;
      // Connect to the db
      MongoClient.connect("mongodb://localhost:27017/IS219", function (err, db) {
      	if(err){
      		console.log("Error! " + err);
      	}
         var collection = db.collection(collName);
         //insert records in one bulk insert
         collection.insert(records, function (err, doc) {
         	if(err){
      			console.log("Insert error! " + err);
      		}
            console.log(doc);
         });
      });
      console.log('Number of lines: ' + count);
      console.log("Number of docs: " + records.length);
   });
}

exports.loadIndexPage = function(req, res, next) {
	
	CollegeList.find({}, function(err, resultsArr){
		res.render('collegeList', { resultSet: resultsArr});
	});
	
}
//Display Form to upload csv
exports.loadUploadPage = function(req, res, next) {
	res.render('upload', {});
}

//code to process downloaded csv from the use
exports.loadDownloadForm = function(req, res, next) {
	console.log("loading form...");

	if(Object.keys(req.files).length == 0){
		console.log("files is null!");
		res.render('uploadError', {});
	}
	else{
		console.log("files not null!");
		var filePath = req.files.csvFile.path;
		var collectionName = "collegeVarDetails";

		importAndParseFile(filePath, collectionName);
		res.render('uploadConfirm', {});
	}
	
}

exports.loadRecord = function(req, res, next) {

	CollegeRecord.find({}, function(err, rArray){

		var queryOptionsString = "";
		var nameToTitleObject = {};

		//required loop
		for (var i=0; i<rArray.length; i++){

			//push doc.varname into string
			queryOptionsString += rArray[i].varname + " ";
			nameToTitleObject[rArray[i].varname] = rArray[i].varTitle;
		}

		//Get rid of space character at end of string
		var queryOptionsString = queryOptionsString.substring(0,queryOptionsString.length-1);

		//Now have string of varnames [UNITID, INSTNM, ect...] that we will pass to query as options
		CollegeLookup.findOne({ _id : req.params.cid}, queryOptionsString, {lean: true}, function (err, rec){

			var renderObject = {};

			for (ele in rec){
				var valueforCurrentDoc = rec[ele];
				var key = nameToTitleObject[ele];
				console.log(key + " : " + valueforCurrentDoc);
				if(valueforCurrentDoc != req.params.cid){
					renderObject[key] = valueforCurrentDoc;
				}
			}

			res.render('collegeRecord', { resObj2 : renderObject});
		});

	});//*/
}