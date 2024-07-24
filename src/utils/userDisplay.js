class user {
    constructor(fName, lName, email, username, posts=[]){
        this.fName = fName;
        this.lName = lName;
        this.email = email;
        this.username = username;
        this.posts=posts;
        this.addPost = (post)=>{
            this.posts.push(post);
        }
        this.deletePost = (post)=>{
            const currentPost = this.posts.find(post);
            this.posts.splice(currentPost, 1);
        }
    }
}
class post {
    constructor (creator, title, body){
        this.creator = creator;
        this.title = title;
        this.body = body;
        this.updateBody = (newBody) =>{
            this.body = newBody;
        }
        this.updateTitle = (newTitle)=>{
            this.title = newTitle;
        }
    }
}
