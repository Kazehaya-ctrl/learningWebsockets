import { io } from "socket.io-client";

const socket = io("ws://localhost:4000");

socket.on("connect", () => {
	console.log("Connected:", socket.id);

	socket.emit("message", "Hello, Server!");

	socket.on("message", (data) => {
		console.log("Message from server:", data);
	});
});

socket.on("disconnect", () => {
	console.log("Disconnected");
});
