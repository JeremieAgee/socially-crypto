import {
    getAllDocs,
    addADoc,
    removeADoc,
    updateADoc,
} from "./firebaseUtils";
import { db } from "../../firebase.config";
import PostComponent from "@/components/PostComponent";
class User {
    constructor(fName, lName, email, username, uid, id = null, friends = null, pendingSentFriends = null, pendingReceivedFriends = null, isAdmin = false) {
        this.fName = fName;
        this.lName = lName;
        this.email = email;
        this.username = username;
        this.friends = friends;
        this.id = id;
        this.uid = uid;
        this.pendingSentFriends = pendingSentFriends;
        this.pendingReceivedFriends = pendingReceivedFriends;
        this.isAdmin = isAdmin;
        this.addFriend = (friendsUid) => {
            this.friends.push(friendsUid);
        }
        this.removeFriend = (friendsId) => {
            const friendToRemove = this.friends.find((id) => friendsId === id);
            this.friends.splice(friendToRemove, 1);
        }
        this.addPendingSent = async (usersId) => {
            this.pendingSentFriends.push(usersId);
            updateADoc(db, "users", this, this.id)
        }
        this.addPendingReceived = (usersId) => {
            this.pendingReceivedFriends.push(usersId)
        }
    }
}
class Post {
    constructor(creatorUid, title, content, creatorUsername, id = null) {
        this.creatorUid = creatorUid;
        this.title = title;
        this.content = content;
        this.creatorUsername = creatorUsername;
        this.id = id;
        this.updateContent = (newContent) => {
            this.content = newContent;
        }
        this.updateTitle = (newTitle) => {
            this.title = newTitle;
        }
        this.updateVisibleTo = (ids) => {
            this.visibleTo = ids;
        }
    }

}

class SocialSite {
    constructor(users = [], posts = []) {
        this.users = users;
        this.posts = posts;
        this.addUser = async (newUser) => {
            const isUser = this.findUser(newUser.uid);
            const docId = await addADoc(db, "users", newUser);
            console.log(docId);
            const userToAdd = new User(newUser.fname, newUser.lname, newUser.email, newUser.username, newUser.uid, docId);
            if (isUser) {
                window.alert(`Username or email is already taken`)
            } else {
                this.users.push(userToAdd);
                return docId;
            }
        }
        this.deleteUser = (userToDeleteUid, userUid) => {
            const userToRemove = this.findUser(userToDeleteUid);
            const currentUser = this.findUser(userUid);
            if (userToRemove && currentUser.isAdmin) {
                this.splice(userToRemove, 1);
                removeADoc(db, "users", userToRemove.id);
            } else if (userToRemove) {
                this.splice(userToRemove, 1);
                removeADoc(db, "users", userToRemove.id);
            } else {
                window.alert(`Failed to remove user.`)
            }
        }
        this.updateUser = (oldUser) => {
            const userToUpdate = this.findUser(oldUser.uid);
            if (userToUpdate) {
                const index = this.posts.indexOf(userToUpdate)
                this.users.splice(index, 1, oldUser)
                updateADoc(db, "users", oldUser, oldUser.id)
            }
        }
        this.findUser = (userUid) => {
            const foundUser = this.users.find((user) => user.uid === userUid);
            if (foundUser) {
                return foundUser;
            } else {
                console.log("no user")
            }
        }
        this.addPost = async (newPost) => {
            const docId = await addADoc(db, "posts", newPost);
            const postToAdd = new Post(newPost.creatorUid, newPost.title, newPost.content, newPost.creatorUsername, docId);
            this.posts.push(postToAdd);
            console.log(postToAdd);
            return docId;
        }
        this.deletePost = (oldPostId) => {
            const postToDelete = this.findPost(oldPostId);
            if (postToDelete) {
                const postToRemove = this.findPost(oldPostId);
                this.posts.splice(postToRemove, 1);
                removeADoc(db, "posts", oldPostId)
            }
        }
        this.findPost = (postId) => {
            const foundPost = this.posts.find((post) => post.id === postId);
            if (foundPost) {
                return foundPost;
            } else {
                console.log(`No post found with an id of ${postId}`)
            }
        }
        this.updatePost = (oldPost) => {
            const postToUpdate = this.findPost(oldPost.id);
            if (postToUpdate) {
                updateADoc(db, "posts", oldPost, oldPost.id)
                const index = this.posts.indexOf(postToUpdate)
                this.posts.splice(index, 1, oldPost);
            }
        }
        this.setSite = async () => {
            const currentUsers = (await getAllDocs(db, "users"));
            const currentPosts = (await getAllDocs(db, "posts"));
            const users = currentUsers.map(user => new User(user.fname, user.lname, user.email, user.username, user.uid, user.id, user.freinds, user.pendingSentFriends, user.pendingReceivedFriends, user.isAdmin));
            this.users = users;
            const posts = currentPosts.map(post => new Post(post.creatorUid, post.title, post.content, post.creatorUsername, post.id))
            this.posts = posts;
            console.log(this.posts);
            console.log(this.users);
        }
        this.returnNewPost = (post) => {
            return (<PostComponent post={post} userUid={post.creatorUid} />)
        }
        this.setSite();
    }
}
const socialSite = new SocialSite([], []);
export { User, Post, SocialSite, socialSite }
