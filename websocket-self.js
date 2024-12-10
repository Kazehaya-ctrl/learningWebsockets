const express = () => {
	const app = {
		listen: (portNumber, callback) => {
			return callback();
		},
	};
	return app;
};

const wss = () => {
	const app = {
		on: (event, callback) => {
			if (event === "connection") {
				const ws = {
					on: (event, callback) => {
						if (event === "message") {
							const data = "hello";
							const isBinary = false;
							callback(data, isBinary);
						}
					},
				};
				callback(ws);
			}
		},
		clients: () => {
			//check how many clients are there and return an array
			const arra = [
				{
					name: "aryan",
					readyState: true,
					send: (message) => {
						console.log(message);
					},
				},
				{
					name: "kushagra",
					readyState: true,
					send: (message) => {
						console.log(message);
					},
				},
				{
					name: "Avnish",
					readyState: false,
					send: (message) => {
						console.log(message);
					},
				},
			];
			return arra;
		},
	};
	return app;
};

const websocketopen = true;
const data = "string";

const app = express();
const port = 3000;
app.listen(port, () => {
	console.log("Connection on " + port);
});

const wss_implementation = wss();
wss_implementation.on("connection", function connection(ws) {
	ws.on("message", function message(data, isBinary) {
		wss_implementation.clients().forEach((client) => {
			if (client.readyState == websocketopen) {
				client.send(data);
			}
		});
	});
});

/* const callback = function message(data, isBinary) {}
 */
