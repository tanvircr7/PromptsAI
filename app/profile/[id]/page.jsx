"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const userProfile = ({ params }) => {
	const router = useRouter();
	const { data: session } = useSession();

	const [posts, setPosts] = useState([]);

	const pathName = usePathname();
	const userId = pathName.split("/")[2];
	const searchParams = useSearchParams();
	const userName = searchParams.get("name");
	console.log(userId);
	console.log(`999 ${params.id}`);
	// console.log(`999 ${id}`);

	useEffect(() => {
		const fetchPosts = async () => {
			// const res = await fetch(`../api/users/${userId}/posts`);
			const res = await fetch(`../api/users/${params.id}/posts`); // dynamic routes has that dynamic variable to use
			const data = await res.json(); // .json() also needs to be Await

			setPosts(data);
		};

		if (userId) fetchPosts(); // if check because you might have no prompts to your name
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
			name={userName}
			desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s prompts`}
			data={posts}
			// handleEdit={handleEdit}
			// handleDelete={handleDelete}
		/>
	);
};

export default userProfile;
