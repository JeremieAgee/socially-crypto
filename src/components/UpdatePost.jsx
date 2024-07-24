import { useState } from "react";
import { updateADoc } from "@/utils/firebaseUtils"; // Adjust the import path if needed
import { auth, db } from "../../firebase.config"; // Ensure db is imported correctly

const UpdatePost = ({ post, onClose }) => {
	const [title, setTitle] = useState(post.data.title);
	const [content, setContent] = useState(post.data.content);
	const [visibility, setVisibility] = useState(post.data.visibility);
	const [error, setError] = useState(null);

	const handleUpdate = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior
		try {
			await updateADoc(db, "posts", { title, content, visibility }, post.id);
				// Close the update form after successful update
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
					<div>
						<label htmlFor="visibility" className="block text-sm font-medium">
							Visibility
						</label>
						<select
							id="visibility"
							value={visibility}
							onChange={(e) => setVisibility(e.target.value)}
							className="w-full px-3 py-2 border rounded-md shadow-sm"
						>
							<option value="public">Public</option>
							<option value="private">Private</option>
						</select>
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
