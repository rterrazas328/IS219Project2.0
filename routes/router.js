var express = require('express');
var router = express.Router();

var loader = require('../controllers/pageLoader');

/* GET home page. */
router.get('/', loader.loadIndexPage);
router.get('/college/:cid', loader.loadRecord);
router.get('/upload',  loader.loadUploadPage);
router.post('/upload', loader.loadDownloadForm)

module.exports = router;
