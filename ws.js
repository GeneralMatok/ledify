// Node.js WebSocket server script
const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', ws => {
    ws.on('message', message => {
        console.log(`Received message => ${message}`)
    })

    setInterval(() => {
        ws.send(JSON.stringify({
            text: "time sent back",
            time: new Date().getTime()
        }));
    }, 1000);

})