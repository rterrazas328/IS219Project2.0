//AJAX Request
console.log("TEST variable ID scope");
var c = $('h1').attr('id');

$.ajax({
	type: "GET",
	url: './questionData2/' + c,
	dataType: 'json'

}).done(function(collObj){
	//build data Arrays
	var mArray = ['Male', collObj['Grand total men']];
	var fArray = ['Female', collObj['Grand total women']];

	var chart = c3.generate({
		bindto: '#chart',
		data: {
			columns: [
				mArray,
				fArray
			],
			type: 'pie'
		}
	});
console.log("success\n");

});