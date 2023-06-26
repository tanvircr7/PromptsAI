"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
	const router = useRouter();
	const { data: session } = useSession();

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const res = await fetch(`api/users/${session?.user.id}/posts`);
			const data = await res.json(); // .json() also needs to be Await

			setPosts(data);
		};

		if (session?.user.id) fetchPosts(); // if check because you might have no prompts to your name
	}, []);

	const handleEdit = (post) => {
		router.push(`/update-prompt?id=${post._id}`);
	};

	const handleDelete = async (post) => {
		const hasConfirmed = confirm(
			"Are you sure you want to delete this prompt?"
		);

		if (hasConfirmed) {
			try {
				await fetch(`api/prompt/${post._id.toString()}`, {
					method: "DELETE",
				});

				const filteredPosts = posts.filter((p) => p._id !== post.id);
				setPosts(filteredPosts);
			} catch (err) {
				console.log(err);
			}
		}
	};
	return (
		<Profile
			name="My"
			desc="welcome to your personal profile page"
			data={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default MyProfile;
