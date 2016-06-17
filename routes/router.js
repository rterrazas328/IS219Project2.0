var express = require('express');
var router = express.Router();

var loader = require('../controllers/pageLoader');

/* GET home page. */
router.get('/', loader.loadIndexPage);
router.get('/college/:cid', loader.loadRecord);
router.get('/upload',  loader.loadUploadPage);
//router.post('/upload', loader.loadDownloadForm);
router.post('/upload', loader.loadDownloadForm);
//questions
router.get('/question1', loader.loadQuestionForm1);
router.get('/question2', loader.loadQuestionForm2List);
router.get('/question2/:cid', loader.loadQuestionForm2);
router.get('/question3', loader.loadQuestionForm3List);
router.get('/question3/:cid', loader.loadQuestionForm3);
//AJAX Requests
router.get('/questionData1', loader.loadQuestionData1);
router.get('/questionData2/:cid', loader.loadQuestionData2);
router.get('/questionData3/:cid', loader.loadQuestionData3);
module.exports = router;
