import React, { useEffect, useRef } from "react";

export default function CanvasSetting() {
	const canvasRef: any = useRef();

	useEffect(() => {
		const canv: any = canvasRef.current;
		const ctx = canv.getContext("2d");
		const image = new Image();

		image.src = "../assets/pixelchar.png";

		image.onload = () => {
			ctx.drawImage(image, 100, 100, canv.width, canv.height);
		};
	}, []);

	return (
		<>
			<div>
				<canvas
					height={400}
					ref={canvasRef}
					width={800}
					style={{ background: "black" }}
				/>
			</div>
		</>
	);
}
