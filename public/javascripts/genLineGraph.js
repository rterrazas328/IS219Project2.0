//AJAX Request
console.log("TEST variable ID scope");
var c = $('h1').attr('id');

$.ajax({
	type: "GET",
	url: '/questionData3/' + c,
	dataType: 'json'

}).done(function(collObj){
	console.log("Success!!!");
	//console.log(collObj);
	//build data Arrays
	var tuitionInc = ['Tuition Increase', collObj['Tuition and fees 2010-11'], collObj['Tuition and fees 2013-14']];
	var yearsArr = ['2010', '2013'];

	var chart = c3.generate({
		bindto: '#chart',
		data: {
			columns: [
				tuitionInc
			]
		},
		axis: {
			x: {
			type: 'category',
			categories: yearsArr
		}
		}
	});

console.log("success\n");

});