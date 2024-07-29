import { useState } from "react";
import { socialSite } from "@/utils/userDisplay";

function AddPost({ onClose, user} ) {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [currentUser, setCurrentUser] = useState(user);
	const handleSubmit = async (e) => {
		e.preventDefault();
		let thisPost = { creatorUid: currentUser.uid, title, content, creatorUsername: currentUser.username, id: "" }
		if (currentUser) {
			const docId = await socialSite.addPost(thisPost);
			console.log(docId)
			thisPost.id = docId
			socialSite.updatePost(thisPost);
			setTitle("");
			setContent("");
			onClose(); // Close the AddPost component after successful submission
		} else {
			console.log("User not authenticated");
		}
	};

	return (
		<div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
			<h2 className="text-2xl font-bold mb-4">Add Post</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label
						htmlFor="title"
						className="block text-sm font-medium text-gray-700"
					>
						Title
					</label>
					<input
						id="title"
						type="text"
						placeholder="Enter post title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
					/>
				</div>
				<div>
					<label
						htmlFor="content"
						className="block text-sm font-medium text-gray-700"
					>
						Content
					</label>
					<textarea
						id="content"
						placeholder="Enter post content"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						required
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-32 resize-none"
					/>
				</div>
				<div className="flex justify-between items-center">
					<button
						type="submit"
						className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						Add Post
					</button>
					<button
						type="button"
						onClick={onClose}
						className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}

export default AddPost;
