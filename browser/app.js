
// This object describes the URL of the page we're on!
var socket = io(window.location.href);

socket.on('connect', function () {
    console.log('I have made a persistent two-way connection to the server!');
});

whiteboard.on('draw', function(start, end, strokeColor){
	console.log(start, end, strokeColor)
	socket.emit("mouseLocation", start, end, strokeColor)
})

socket.on('otherArtistMouse', function(start, end, strokeColor){
	whiteboard.draw(start, end, strokeColor)
})


