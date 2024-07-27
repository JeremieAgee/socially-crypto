"use client";
import { useEffect, useState } from "react";
import { auth } from "../../../firebase.config";
import PostComponent from "@/components/PostComponent"; 
import LogoutButton from "@/components/LogoutButton";
import AddPost from "@/components/AddPost"; 
import { SocialSite, User } from "@/utils/userDisplay";

const UsersPage = () => { 
  const [currentSite, setCurrentSite]= useState(new SocialSite());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddPost, setShowAddPost] = useState(false);
  const [userUid, setUserUid]= useState("");
  const[currentUser, setCurrentUser] = useState(new User("","","","", userUid))
  useEffect(() => {
    const fetchPosts = async () => {
        setUserUid(auth.currentUser.uid)
        let site = new SocialSite([],[]);
        await site.setSite();
        let user = site.findUser(userUid)
        setCurrentUser(user);
        setCurrentSite(site);
        if (site.posts==null){
        setError("Failed to fetch posts");}
        setLoading(false);

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
          <AddPost onClose={handleAddPostClick} user={currentUser} />
        </div>
      )}
	  </div>

      <h1 className="text-2xl font-bold mb-4">User Posts</h1>
     <div>
	  {currentSite.posts.length === 0 && !showAddPost ? (
        <p>No posts available</p>
      ) : (
        <div className="space-y-4">
          {currentSite.posts.map((post) => (
            <PostComponent key={post.id} post={post} user={currentUser} />
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