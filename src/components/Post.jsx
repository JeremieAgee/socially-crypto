import { useState } from "react";
import UpdatePost from "./UpdatePost";
import { auth, db } from "../../firebase.config";
import { removeADoc } from "@/utils/firebaseUtils";
const Post = ({ post }) => {
	const [showUpdate, setShowUpdate] = useState(false);
	const [postId, setPostId] = useState(post.id);
	const handleUpdateClick = () => {
		if(auth.currentUser.uid===post.data.uid){
		setShowUpdate(true);
		}
	};
	const handleCloseUpdate = () => {
		setShowUpdate(false);
	};
	async function handleDelete(){
		if(auth.currentUser.uid===post.data.creatorUid){
		await removeADoc(db, "posts", postId)
		}
	}
	return (
		<div className="relative p-6 bg-white rounded-lg shadow-md">
			<h2 className="text-xl font-semibold mb-2">{post.data.title}</h2>
			<p className="text-gray-700 mb-4">{post.data.content}</p>
			<div className="text-sm text-gray-500">
				Posted by {post.data.creatorUid || "Anonymous"}
			</div>
			<div className="absolute top-2 right-2 flex space-x-2">
				<button
					onClick={handleUpdateClick}
					className="px-2 py-1 text-sm font-medium border border-transparent rounded-md shadow-sm bg-blue-500 text-white hover:bg-blue-600"
				>
					Update
				</button>
			</div>
			<button onClick={handleDelete} className="px-2 py-1 text-sm font-medium border border-transparent rounded-md shadow-sm bg-blue-500 text-white hover:bg-blue-600">Delete</button>
			{showUpdate && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<UpdatePost post={post} onClose={handleCloseUpdate} />
				</div>
			)}
		</div>
	);
};

export default Post;
