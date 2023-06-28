"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import SearchIcon from "@mui/icons-material/Search";
import TagIcon from "@mui/icons-material/Tag";
import HomeIcon from "@mui/icons-material/Home";

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post) => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	);
};

const Feed = () => {
	const [searchText, setSearchText] = useState("");
	const [posts, setPosts] = useState([]);
	const [feedPosts, setFeedPosts] = useState([]);
	const refreshRate = 1000; // 16.6 minutes
	const handleSearchChange = (e) => {
		setSearchText(e.target.value);
	};
	const handleFormSubmit = (e) => {
		e.preventDefault();
		filterPrompts();
	};

	// I keep forgetting useEffect( () => { everything else }, reactingThing)
	// it needs a function for everything else

	const fetchOldPosts = () => {
		setPosts(feedPosts);
		console.log("fetch OLD POSTS");
	};

	const fetchPosts = async () => {
		const res = await fetch(`/api/prompt`);
		const data = await res.json(); // .json() also needs to be Await

		setSearchText("");
		setPosts(data);
		setFeedPosts(data);
	};

	useEffect(() => {
		fetchPosts();
		console.log(1);
	}, []);

	const filterPrompts = () => {
		if (searchText === "") {
			console.log("1");
			return;
		}

		const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
		const newPosts = feedPosts.filter(
			(item) =>
				regex.test(item.creator.username) ||
				regex.test(item.tag) ||
				regex.test(item.prompt)
		);
		setPosts(newPosts);
	};

	// useEffect(filterPrompts, [posts]);

	const handleTagClick = (searchTag) => {
		const regex = new RegExp(searchTag, "i"); // 'i' flag for case-insensitive search
		setPosts(feedPosts);
		const newPosts = posts.filter((item) => regex.test(item.tag));
		setPosts(newPosts);
	};

	return (
		<section className="feed">
			<form
				onSubmit={handleFormSubmit}
				className="relative w-full flex-center space-x-2"
			>
				<div className="cursor-pointer">
					<HomeIcon onClick={fetchOldPosts} />
				</div>
				<input
					type="text"
					placeholder="search for a tag or username"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
				<div className="cursor-pointer">
					<SearchIcon onClick={filterPrompts} />
				</div>
			</form>

			<PromptCardList data={posts} handleTagClick={handleTagClick} />
		</section>
	);
};

export default Feed;
