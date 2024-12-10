import express from "express";
import { WebSocket, WebSocketServer } from "ws";

const app = express();
const port = 3001;

const server = app.listen(port, () => {
	console.log(new Date() + ` Connection on ${port}`);
});

const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws) {
	ws.on("error", function error(err) {
		console.log("Err" + err);
	});
	ws.on("message", function message(data, isBinary) {
		wss.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(data, { binary: isBinary });
			}
		});
	});
	ws.send("Hi there from Server");
});
