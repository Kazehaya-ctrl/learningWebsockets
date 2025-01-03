import express, { Response, Request } from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
	console.log(new Date() + ` Server running on port ${port}`);
});

const io = new Server(server);

io.on("connection", (socket) => {
	console.log(`Client Connected ${socket.id}`);

	socket.on("disconnect", () => {
		console.log(`Client Disconnected ${socket.id}`);
	});

	socket.on("message", (data) => {
		console.log(`Message from ${socket.id}: ${data}`);
		io.emit("message", data);
	});
});

app.get("/", (req: Request, res: Response) => {
	res.json({ msg: "hello" });
});
