const express = require('express');
const app = express();
const port = 5000;

let users = [
    { id: 1, name: "Rana" ,email:"rana@gmail.com"},
    { id: 2, name: "Anas" ,email:"anas@gmail.com"},
];

let posts = [
    { id: 100, title: "First Post", content: "Content three" },
    { id: 101, title: "Second Post", content: "Content two" },
];

// Middleware to parse JSON requests
app.use(express.json());

// User endpoints
//1-get all users
app.get('/getAllUsers', (req, res) => {
    return res.json({msg : "done" ,users: users});
});

//2-add user 
app.post('/addUsers',(req,res,next)=>{
    const {email}=req.body
let userexis=users.find((element)=>{
    return element.email == email
})
if(userexis){
    return res.json({Msg:"user already exist"})
}else{
    req.body.id=users.length +1 //unique
    users.push(req.body)
    return res.json({msg:"done",users})
}
})

//3-sort users by name
app.get('/userssortByName', (req, res) => {
    const sortedUsers = users.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    res.json(sortedUsers);
});

//4-delete user 

app.delete('/deleteUser', (req, res) => {
    const {id}=req.body
    let exist=false
   for (var user of users) {
    if(user.id == id){
        exist = true 
        break;
    }
}
if(exist){
    users = users.filter(user => user.id !== id);
    return res.json({ message: 'User deleted successfully' });
   
}else{
    return res.json({msg:"user not found "})
}
})

//5-update user 
app.patch('/updateUser', (req,res,next)=>{
    const{id,name}=req.body
    let exist=false
    for (var user of users) {
        if(user.id == id){
            user.name = name
            exist = true 
            break;
        }
    }
    if(exist){
        return res.json({msg:"user updated",user})
    }else{
        return res.json({msg:"user not found "})
    }
    })
//6-search by id
    
    app.post('/searchbyid',(req,res,next)=>{
        let {id}=req.body
    let usersexist = users.find((ele)=>{
        return ele.id === id 
    }) 
    if(usersexist){
        return res.json({msg:"found",user : usersexist})
    }else {
        return res.json({msg:"user not found"})
    }
    })

//Post endpoints
//1-get all posts
app.get('/getAllPosts', (req, res) => {
    return res.json({msg : "done" ,posts: posts});
});
//2-add post 
app.post('/addPost',(req,res,next)=>{
    const {title}=req.body
let postexis=posts.find((element)=>{
    return element.title == title
})
if(postexis){
    return res.json({Msg:"post already exist"})
}else{
    req.body.id=users.length +1 //unique
    posts.push(req.body)
    return res.json({msg:"done",posts})
}
})
//3- Get all Posts reversed
app.get('/getAllPostsReversed', (req, res) => {
    const reversedPosts = posts.slice().reverse();
    res.json(reversedPosts);
});

//4- delete post
app.delete('/deletePost', (req, res) => {
    const {id}=req.body
    let exist=false
   for (var post of posts) {
    if(post.id == id){
        exist = true 
        break;
    }
}
if(exist){
    posts = posts.filter(post => post.id !== id);
    return res.json({ message: 'post deleted successfully' });
   
}else{
    return res.json({msg:"post not found "})
}
})

//5- update post
app.patch('/updatePost', (req,res,next)=>{
    const{id,title}=req.body
    let exist=false
    for (var post of posts) {
        if(post.id == id){
            post.title = title
            exist = true 
            break;
        }
    }
    if(exist){
        return res.json({msg:"post updated",post})
    }else{
        return res.json({msg:"post not found "})
    }
    })
//6- search  post by id
app.post('/searchpostbyid',(req,res,next)=>{
    let {id}=req.body
let postexist = posts.find((ele)=>{
    return ele.id === id 
}) 
if(postexist){
    return res.json({msg:"found",post : postexist})
}else {
    return res.json({msg:"post not found"})
}
})

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});