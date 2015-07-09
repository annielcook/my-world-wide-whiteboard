var arr = [];

// This object describes the URL of the page we're on!
var socket = io(window.location.href);

socket.on('connect', function() {
  console.log('I have made a persistent two-way connection to the server!');

  socket.on('drawHistory', function(arr) {
    console.log("Draw 2: ", arr)
    arr.forEach(function(line) {
      whiteboard.draw(line.start, line.end, line.strokeColor)
    })
  })

  socket.on('someoneElseDrew', function(start, end, strokeColor) {
    whiteboard.draw(start, end, strokeColor)
  })

  socket.on('drawHistory', function(drawHistory) {
    drawHistory.forEach(function(draw) {
      whiteboard.draw(draw.start, draw.end, draw.color);
    });
  });

  whiteboard.on('draw', function(start, end, strokeColor) {
    socket.emit('drawing', start, end, strokeColor)
  })

})