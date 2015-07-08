var arr = [];

// This object describes the URL of the page we're on!
var socket = io(window.location.href);

socket.on('connect', function () {
    console.log('I have made a persistent two-way connection to the server!'); 
    arr.forEach(function(drawLine){
		whiteboard.draw(drawLine.start, drawLine.end, drawLine.strokeColor)
	})
});

whiteboard.on('draw', function(start, end, strokeColor){
	arr.push({ start: start, end: end, strokeColor: strokeColor })
	socket.emit("mouseLocation", start, end, strokeColor);
	socket.emit("previousDrawings", arr)
})

socket.on('otherArtistMouse', function(start, end, strokeColor){
	arr.push({ start: start, end: end, strokeColor: strokeColor })
	whiteboard.draw(start, end, strokeColor)
})

socket.on('the arr', function(array){
	arr.concat(array);
	arr.forEach(function(drawLine){
		whiteboard.draw(drawLine.start, drawLine.end, drawLine.strokeColor)
	})	
})



