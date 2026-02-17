
import { envs } from "./config";
import { WebSocketServer } from 'ws';


(async () => {
  await main();
})();

async function main() {

  const wss = new WebSocketServer({ port: 3000 });

  wss.on('connection', function connection(ws) {

    // console.log(ws)
    console.log('Client connected')
    ws.on('error', console.error);

    ws.on('message', function message(data) {
      console.log('received: %s', data);
      const payload = JSON.stringify({
        type: 'custom-message',
        payload: data.toString()
      })
      // ws.send(JSON.stringify(payload))
      //* todos -incluyente
      // wss.clients.forEach(function each(client) {
      //   if (client.readyState === WebSocket.OPEN) {
      //     client.send(payload, { binary: false });
      //   }
      // });

      //* Todos expcluyente
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(payload, { binary: false });
        }
      });

    });

    ws.send('Hola desde el servidor');
    // setInterval(() => {
    //   ws.send('Hola desde el servidor de nuevo');

    // }, 2000);

    ws.on('close', () => {
      console.log('Client disconected')
    })
  });

  console.log(`http://localhost:3000`)
}
