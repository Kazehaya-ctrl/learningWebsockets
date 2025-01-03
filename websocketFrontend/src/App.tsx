import { useEffect, useState } from "react";
import "./App.css";
import CanvasSetting from "./components/canvas";

function App() {
	const [socket, setSocket] = useState<null | WebSocket>(null);
	const [msg, setMsg] = useState<string>("");
	const [messages, setMessages] = useState<any>([]);
	const [mousePosition, setMousePosition] = useState<Array<number>>([]);

	const hanldeOnMouseMove = (e: any) => {
		setMousePosition([e.nativeEvent.offsetX, e.nativeEvent.offsetY]);
		socket?.send(
			`Mouse position on x: ${mousePosition[0]} and y: ${mousePosition[1]}`
		);
	};

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

		return () => {
			socket.close();
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

			<CanvasSetting />
			<div>
				{messages.map((message: string, index: number) => {
					return <div key={index}>{message}</div>;
				})}
			</div>
			<div>
				Mouse position on x: {mousePosition[0]} and y: {mousePosition[1]}
			</div>
		</>
	);
}

export default App;
