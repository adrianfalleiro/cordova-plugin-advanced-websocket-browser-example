// https://github.com/PsichiX/simple-websocket-echo-server
const port = 8080;
const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ port: port });

console.log('listening on port: ' + port);

wss.on('connection', function connection(ws) {

  ws.on('message', function (message) {

    if (message === 'close') {
      ws.close(1000, 'connection closed');
    } else {
      console.log('message: ' + message);
      ws.send('echo: ' + message);
    }
  });

  console.log('new client connected!');
  ws.send('connected!');

});