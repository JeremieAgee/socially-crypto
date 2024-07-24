"use client";
import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase.config"; // Make sure to use the correct import path for firebase.config
import Post from "@/components/Post"; 
import LogoutButton from "@/components/LogoutButton";
import AddPost from "@/components/AddPost"; 
import { getAllDocs } from "@/utils/firebaseUtils";

const UsersPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddPost, setShowAddPost] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (auth.currentUser) {
          const fetchedPosts = await getAllDocs(db, "posts");
          setPosts(fetchedPosts);
        } else {
          setPosts([]);
        }
      } catch (err) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  const handleAddPostClick = () => {
    setShowAddPost((prev) => !prev);
  };

  return (
  <main className="p-8">
    { auth.currentUser ? (
	<div>
      <div className="flex justify-center mb-4">
        <button
          onClick={handleAddPostClick}
          className="px-4 py-2 text-lg font-medium border border-transparent rounded-md shadow-sm bg-blue-500 text-white hover:bg-blue-600"
        >
          {showAddPost ? "Close" : "Add Post"}
        </button>
      </div>
	<div>
      {showAddPost && (
        <div className="mb-8">
          <AddPost onClose={handleAddPostClick} />
        </div>
      )}
	  </div>

      <h1 className="text-2xl font-bold mb-4">User Posts</h1>
     <div>
	  {posts.length === 0 && !showAddPost ? (
        <p>No posts available</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}</div>
      <LogoutButton className="mt-4" />
	  </div>
    ):(<div><h1>Sorry!</h1>
		<p>Please Login to view this page</p>
		</div>
	)}
	</main>
  );
};

export default UsersPage;