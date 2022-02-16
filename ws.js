const WebSocketServer = require('websocket').server;
const server = http.createServer();
server.listen(9898);
const wsServer = new WebSocketServer({
    httpServer: server
});
wsServer.on('request', function (request) {
    const connection = request.accept(null, request.origin);
    connection.on('message', function (message) {
        console.log('Received Message:', message.utf8Data);
        setInterval(() => {
            connection.sendUTF(`This one responds at-->${new Date().getTime()}`);
        }, 1000);

    });
    connection.on('close', function (reasonCode, description) {
        console.log('Client has disconnected.');
    });
});