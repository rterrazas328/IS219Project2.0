//AJAX Request

$.ajax({
	type: "GET",
	url: '/questionData1',
	dataType: 'json'

}).done(function(top10Array) {

	//build data Array
	var dataArray = ['Colleges'];
	var top10CNames = [];
	for (var i=0; i<top10Array.length; i++){
		dataArray[i+1] = top10Array[i]['Grand total'];
		top10CNames[i] = top10Array[i]['institution name']
	}

	var chart = c3.generate({
	bindto: '#chart',
	data: {
		columns: [
			dataArray
		],
		types: {
			Colleges: 'bar'
		}
	},
	axis : {
		y: {
			label : {
				text: "Total Number of Students (12 month period)",
				position: 'outer-middle'
			}
		},
		x: {
			type: 'category',
			categories: top10CNames
		}
	}
});
	//console.log(top10Array);
	//console.log(dataArray);
	console.log('DONE');
});



console.log("success\n");