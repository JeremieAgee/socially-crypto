import {
    getAllDocs,
    addADoc,
    removeADoc,
    updateADoc,
} from "./firebaseUtils";
import { db } from "../../firebase.config";
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
    constructor(creatorUid, title, body, creatorUsername, id = null,) {
        this.creatorUid = creatorUid;
        this.title = title;
        this.body = body;
        this.creatorUsername = creatorUsername;
        this.id = id;
        this.updateBody = (newBody) => {
            this.body = newBody;
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
    constructor(users=[], posts=[]) {
        this.users = users;
        this.posts = posts;
        this.addUser = async (newUser) => {
            const isUser = this.users.findUser(newUser.uid);
            if (isUser) {
                window.alert(`Username or email is already taken`)
            } else {
                this.users.push(newUser);
                const docId = addADoc(db, "users", newUser);
                newUser.id = docId;
                updateADoc(db, "users", newUser, docId);
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
        this.updateUser = (oldUser, userUid) => {
            const userToUpdate = this.users.findUser(oldUser.Id);
            const currentUser = this.findUser(userUid);
            if (currentUser.isAdmin && userToUpdate) {
                updateADoc(db, "users", oldUser, oldUser.id)
            } else if (userToUpdate.uid === currentUser.uid) {
                updateADoc(db, "users", oldUser, oldUser.id)
            } else {
                window.alert(`Failed to update user.`)
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
            this.posts.push(newPost);
            let docId = addADoc(db, "posts", newPost);
            newPost.id = docId;
            updateADoc(db, "users", newPost, docId);
        }
        this.deletePost = (oldPostId, userUid) => {
            const postToDelete = this.findPost(oldPostId);
            const currentUser = this.findUser(userUid);
            if (currentUser) {
                const postToRemove = this.findPost(oldPostId);
                this.posts.splice(postToRemove, 1);
                removeADoc(db, "posts", oldPostId)
            } else if (postToDelete.creatorUid === userUid) {
                this.posts.splice(postToDelete, 1)
                removeADoc(db, "posts", postToDelete.id)
            } else {
                window.alert(`You are not the creator of post or an Admin.`)
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
        this.updatePost = (oldPost, userUid) => {
            const postToUpdate = this.findPost(oldPost.id);
            const currentUser = this.findUser(userUid);

            updateADoc(db, "posts", oldPost, oldPost.id)
        }
        this.setSite = async () => {
            const currentUsers = (await getAllDocs(db, "users"));
            const currentPosts = (await getAllDocs(db, "posts"));
            this.posts = currentPosts;
            this.users = currentUsers;
        }
    }
}

export { User, Post, SocialSite }
