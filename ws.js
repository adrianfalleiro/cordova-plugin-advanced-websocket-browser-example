// https://github.com/PsichiX/simple-websocket-echo-server
const port = 8080;
const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ port: port });

console.log('listening on port: ' + port);

function noop() {}

function heartbeat() {
  this.isAlive = true;
}


wss.on('connection', ws => {
  ws.isAlive = true;
  ws.on('pong', () => {
    console.log('received pong');
    ws.isAlive = true
  });

  ws.on('message', message => {

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

const interval = setInterval(() => {
  wss.clients.forEach(ws => {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    console.log('sending ping');
    ws.ping(noop);
  });
}, 30000);

wss.on('close', () => clearInterval(interval));