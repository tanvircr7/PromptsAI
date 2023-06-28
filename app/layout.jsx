import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import React, { Suspense } from "react";
import Loading from "./loading";

export const metadata = {
	title: "PromptsAi",
	description: "Discover & Share AI prompts",
};

// const Nav = React.lazy(() => import("@components/Nav"));
// const Provider = React.lazy(() => import("@components/Provider"));

const RootLayout = ({ children }) => {
	return (
		<html>
			<body>
				<Provider>
					<div className="main">
						<div className="gradient" />
					</div>
					{/* <Suspense fallback={<Loading />}> */}
					<main className="app">
						<Nav />
						{children}
					</main>
					{/* </Suspense> */}
				</Provider>
			</body>
		</html>
	);
};

export default RootLayout;
