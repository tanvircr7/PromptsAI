import Feed from "@components/Feed";

const Home = () => {
	return (
		<section className="w-full flex-center flex-col">
			<h1 className="head_text text-center">
				Discover & Share
				<br className="max-md:hidden" />
				<span className="chic_gradient text-center"> AI-Powered prompts</span>
			</h1>
			<p className="desc text-center">
				An AI prompting tool for discovering, sharing and creating prompts
			</p>
			<Feed />
		</section>
	);
};

export default Home;
