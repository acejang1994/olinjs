$('#hello-button').click(function(){
	$.post('/hello', {
		text: 'data'
	})
	.done(function(data){
		// alert(data);
		$('body').append(data)

	}).error(console.error);
});


// $('#button1').click(function(){ // search by id
	

// });