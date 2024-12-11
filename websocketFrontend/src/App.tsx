import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [socket, setSocket] = useState<null | WebSocket>(null);
	const [msg, setMsg] = useState<string>("");
	const [messages, setMessages] = useState<any>([]);

	useEffect(() => {
		const socket = new WebSocket("ws://localhost:3001");
		socket.onopen = () => {
			console.log("Socket Connected");
			setSocket(socket);
		};

		socket.onmessage = (message) => {
			console.log("Recieved Message: " + message.data);
			setMessages((m: Array<string>) => [...m, message.data]);
		};
	}, []);

	if (!socket) {
		return (
			<>
				<div>Connecting to websocket server...</div>
			</>
		);
	}
	return (
		<>
			<input value={msg} onChange={(e) => setMsg(e.target.value)}></input>
			<button
				onClick={() => {
					socket.send(msg);
					setMsg("");
				}}
			>
				Send
			</button>
			<div>
				{messages.map((message: string, index: number) => {
					return <div key={index}>{message}</div>;
				})}
			</div>
		</>
	);
}

export default App;
