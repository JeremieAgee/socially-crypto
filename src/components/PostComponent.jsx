import React from 'react'; 
import { useState } from "react";
import UpdatePost from "./UpdatePost";
import { socialSite } from "../utils/userDisplay";

const PostComponent = ({ post, userUid }) => {
	const [showUpdate, setShowUpdate] = useState(false);
	const [showEdits, setShowEdits]= useState(userUid===post.creatorUid);
	const [currentUserUid, setCurrentUserUid] = useState(userUid);
	const handleUpdateClick = () => {	
		setShowUpdate(true)	
	};
	const handleCloseUpdate = () => {
		setShowUpdate(false);
	};
	async function handleDelete(){
		let user = socialSite.findUser(userUid);
		if(userUid===post.creatorUid||user.isAdmin){
		socialSite.deletePost(post.id);
		} else{
			window.alert(`Not the creator of post or an admin`);
		}
	}
	return (

		<div className="relative p-6 bg-white rounded-lg shadow-md">
			<h2 className="text-xl font-semibold mb-2">{post.title}</h2>
			<p className="text-gray-700 mb-4">{post.content}</p>
			<div className="text-sm text-gray-500">
				Posted by {post.creatorUsername || "Anonymous"}
			</div>
			
			{showEdits && (
			<div>
				<div className="absolute top-2 right-2 flex space-x-2">
				<button
					onClick={handleUpdateClick}
					className="px-2 py-1 text-sm font-medium border border-transparent rounded-md shadow-sm bg-blue-500 text-white hover:bg-blue-600"
				>
					Update
				</button>
			</div>
			<button onClick={handleDelete} className="px-2 py-1 text-sm font-medium border border-transparent rounded-md shadow-sm bg-blue-500 text-white hover:bg-blue-600">Delete</button>
			</div>)} 
			{showUpdate && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<UpdatePost post={post} onClose={handleCloseUpdate} userUid={currentUserUid} />
				</div>
			)}
		</div>
	);
};

export default PostComponent;
