import Image from "next/image";

const Loading = () => {
	const show = () => {
		console.log("loading......");
	};
	return (
		<div className="w-full flex-center">
			<Image
				src="assets/icons/loader.svg"
				width={50}
				height={50}
				alt="loader"
				className="object-contain"
			/>
			<button onClick={show()}>loading...</button>
		</div>
	);
};

export default Loading;
