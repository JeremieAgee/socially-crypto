import { useState } from "react";
import { SocialSite, Post } from "@/utils/userDisplay";

const UpdatePost = ({ post, user, onClose }) => {
	const [title, setTitle] = useState(post.title);
	const [content, setContent] = useState(post.content);
	const [error, setError] = useState(null);
	const [currentPost, setCurrentPost] = useState(new Post(post.creatorUid, title, content, post.creatorUsername, post.id))
	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			let site = new SocialSite([],[]);
			await site.setSite();
					setCurrentPost(new Post())
					const newPost = {
						creatorUid: post.creatorUid, title, content, creatorUsername: post.creatorUsername, id: post.id
					}
					console.log(post)
					site.updatePost(newPost, user.uid);
				onClose();
		} catch(err){
			console.log(err)
		}
	};

	return (
		
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-2xl font-bold mb-4">Update Post</h2>
				{error && <p className="text-red-500 mb-4">{error}</p>}
				<form onSubmit={handleUpdate} className="space-y-4">
					<div>
						<label htmlFor="title" className="block text-sm font-medium">
							Title
						</label>
						<input
							id="title"
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="w-full px-3 py-2 border rounded-md shadow-sm"
							required
						/>
					</div>
					<div>
						<label htmlFor="content" className="block text-sm font-medium">
							Content
						</label>
						<textarea
							id="content"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							className="w-full px-3 py-2 border rounded-md shadow-sm"
							rows="4"
							required
						/>
					</div>
					<div className="flex justify-end space-x-4">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 text-sm font-medium border border-transparent rounded-md shadow-sm bg-gray-500 text-white hover:bg-gray-600"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-2 text-sm font-medium border border-transparent rounded-md shadow-sm bg-blue-500 text-white hover:bg-blue-600"
						>
							Update
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdatePost;
