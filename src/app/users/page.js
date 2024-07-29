"use client";
import { useEffect, useState } from "react";
import { auth } from "../../../firebase.config";
import PostComponent from "@/components/PostComponent";
import LogoutButton from "@/components/LogoutButton";
import AddPost from "@/components/AddPost";
import { socialSite } from "@/utils/userDisplay";

const UsersPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddPost, setShowAddPost] = useState(false);
  const [currentUser, setCurrentUser] = useState(socialSite.findUser(auth.currentUser.uid));
  useEffect(() => {
    const fetchPosts = async () => {
      if (socialSite.posts.length != 0) {
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
      {currentUser ? (
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
                <AddPost onClose={handleAddPostClick} userUid={currentUser.uid} />
              </div>
            )}
          </div>
          <h1 className="text-2xl font-bold mb-4">User Posts</h1>
          <div>
            {socialSite.posts.length === 0 && !showAddPost ? (
              <p>No posts available</p>
            ) : (
              <div className="space-y-4">
                {socialSite.posts.map((post) => (
                  <PostComponent key={post.id} post={post} userUid={currentUser.uid} />
                ))}
              </div>
            )}</div>
          <LogoutButton className="mt-4" />
        </div>
      ) : (<div><h1>Sorry!</h1>
        <p>Please Login to view this page</p>
      </div>
      )}
    </main>
  );
};

export default UsersPage;