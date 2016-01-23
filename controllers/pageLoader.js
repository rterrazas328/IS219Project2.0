var mongoose = require('mongoose');
var events = require('events');
var eventEmitter = new events.EventEmitter;
var csv = require('csv');
var fs = require('fs');
require('../models/CollegeList');
/*var cacheOpts = {
	max:50,
	maxAge:1000*60*2
};
require('mongoose-cache').install(mongoose, cacheOpts);//*/

var records = new Array();
var records = [];

//Connect to mongoDB
mongoose.connect('mongodb://heroku_9dlrrxv3:2v9f48c2rq5lunt1dilf9em2gn@ds057254.mongolab.com:57254/heroku_9dlrrxv3');
var db = mongoose.connection;

console.log("loading models...");
var CollegeList = mongoose.model('college');
var CollegeRecord = mongoose.model('record');
var CollegeLookup = mongoose.model('lookup');

var EnrollmentDataSet = mongoose.model('enrolled');
var MFDataSet = mongoose.model('male_female');
var TuitionDataSet = mongoose.model('tuition');

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
      MongoClient.connect("mongodb://heroku_9dlrrxv3:2v9f48c2rq5lunt1dilf9em2gn@ds057254.mongolab.com:57254/heroku_9dlrrxv3", function (err, db) {
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
		var collectionName = "tuition";//edit collegeVarDetails, enrollment

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
//just renders the jade view which contains script
exports.loadQuestionForm1 = function(req, res, next) {
	res.render('question1', {});
}//*/

//loads data into ajax response to be loaded into the graph
exports.loadQuestionData1 = function(req, res, next){
	EnrollmentDataSet.find({}, function(err, resultArr){

		resultArr.sort(function(a,b){
			return b['Grand total'] - a['Grand total'];
		});

		var topTen = [];
		for (var i=0; i<10; i++){
			topTen[i] = resultArr[i];
		}

		res.send(topTen);
	});
}

exports.loadQuestionForm2 = function (req, res, next) {
	res.render('question2', { collegeID : req.params.cid});
}//*/

exports.loadQuestionData2 = function(req, res, next){
	MFDataSet.findOne({ unitid : req.params.cid }, function (err, recObj) {
		res.send(recObj);
	});
}

exports.loadQuestionForm3 = function(req, res, next) {
	res.render('question3', { collegeID : req.params.cid});
}//*/

exports.loadQuestionData3 = function(req, res, next){
	TuitionDataSet.findOne({ unitid : req.params.cid}, function (err, recObj){
		console.log(recObj);
		res.send(recObj);
	});
}

exports.loadQuestionForm2List = function(req, res, next){
	CollegeList.find({}, function(err, resultsArr){
		res.render('question2List', { resultSet: resultsArr});
	});
}
exports.loadQuestionForm3List = function(req, res, next) {
	CollegeList.find({}, function(err, resultsArr){
		res.render('question3List', { resultSet: resultsArr});
	});
}//*/
