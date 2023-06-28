import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
// was importing connectToDB from mongoose instead of utils causing error

export const GET = async (request, { params }) => {
	try {
		await connectToDB();
		// console.log(`params -> ${params.id}`);

		const prompts = await Prompt.find({
			creator: params.id,
		}).populate("creator");

		return new Response(JSON.stringify(prompts), { status: 200 });
	} catch (error) {
		return new Response("Failed to fetch prompts", { status: 500 });
	}
};
