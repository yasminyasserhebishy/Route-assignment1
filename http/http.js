const http=require("http")
const port = 3000
let users = [
    {id:2 , name :"yasmin"},
    {id:1 , name :"khaled" }
    ]
let posts = [
    {id:200 , title:"post1", content:"Hello Yasmin"},
    {id:201 , title:"post2", content:"Hello khaled"} 
]

http.createServer((req,res,next)=>{
  //user endpoint 
    //1-get all users
    if (req.method == 'GET' && req.url=='/getallusers'){
        res.write(JSON.stringify(users))
        res.end()
    //2-add a new user
}else if (req.method == 'POST' && req.url == '/addUser') {
    let bufferdata;
    req.on('data', chunk => {
        bufferdata = chunk ;
    });

    req.on('end', () => {
      let convertbuffertodata = JSON.parse(bufferdata)
      users.push(convertbuffertodata)
      res.write(JSON.stringify({ message: 'User added successfully', user: users }))
      res.end()
    });
} 
//3-get all users sorted alphabetically by name
else if (req.method == 'GET' && req.url == '/getAllUsersSortedByName') {
    const sortedUsers = users.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      res.write(JSON.stringify(sortedUsers));
      res.end()

  } 
  // 4- delete a user by ID
  else if (req.method === 'DELETE' && req.url === '/deleteUser') {
    let userId ;
    req.on('data', chunk => {
        userId = chunk ;
    });

    req.on('end', () => {
      let Useridafterconvert = JSON.parse(userId)
      const index = users.findIndex(user => user.id === Useridafterconvert.id);
    if (index !== -1) {
      users.splice(index, 1);
      res.write(JSON.stringify({ message: 'User deleted successfully' }));
      res.end();
    } else {
      res.write(JSON.stringify({ message: 'User not found' }));
      res.end();
    }
      });

  } 
    //5- update a user
    else if (req.method === 'PATCH' && req.url === '/updateUser') {
        let newData ;
        req.on('data', chunk => {
            newData = chunk;
        });
    
        req.on('end', () => {
          const updateUser = JSON.parse(newData);
          const index = users.findIndex(user => user.id === updateUser.id);
          if (index !== -1) {
            users[index] = updateUser;
            res.write(JSON.stringify({ message: 'User updated successfully', user: updateUser }));
            res.end();
          } else {
            res.write(JSON.stringify({ message: 'User not found' }));
            res.end();
          }
        });
      }
       // 6- search for a user by ID
  else if (req.method === 'GET' && req.url === '/searchUserById') {
    let userIdd ;
    req.on('data', chunk => {
        userIdd = chunk ;
    });

    req.on('end', () => {
    let searchedid = JSON.parse(userIdd)
    const user = users.find(user => user.id === searchedid.id);
    if (user) {
      res.write(JSON.stringify(user));
      res.end();
    } else {
      res.write(JSON.stringify({ message: 'User not found' }));
      res.end();
    }
      });
    
    }
    //posts endpoint
    //1- GetAllPosts
    else if(req.method == 'GET' && req.url=='/getallposts'){
      res.write(JSON.stringify(posts))
      res.end()
}
 //2-add a new post
else if (req.method == 'POST' && req.url == '/addPost') {
  let bufferdata;
  req.on('data', chunk => {
      bufferdata = chunk ;
  });

  req.on('end', () => {
    let convertbuffertodata = JSON.parse(bufferdata)
    users.push(convertbuffertodata)
    res.write(JSON.stringify({ message: 'post added successfully', posts: posts }))
    res.end()
  });
} 
//3- Get all Posts reversed
else if (req.method === 'GET' && req.url === '/getAllPostsReversed') {
  const reversedPosts = posts.reverse();
  res.write(JSON.stringify(reversedPosts));
  res.end();
}
//4- delete post by id 
else if (req.method === 'DELETE' && req.url === '/deletePost') {
  let postId ;
  req.on('data', chunk => {
      postId = chunk ;
  });

  req.on('end', () => {
    let postidafterconvert = JSON.parse(postId)
    const index = posts.findIndex(post => post.id === postidafterconvert.id);
  if (index !== -1) {
    posts.splice(index, 1);
    res.write(JSON.stringify({ message: 'post deleted successfully' }));
    res.end();
  } else {
    res.write(JSON.stringify({ message: 'post not found' }));
    res.end();
  }
    });}
  //5- update post
  else if (req.method === 'PATCH' && req.url === '/updatePost') {
    let newData ;
    req.on('data', chunk => {
        newData = chunk;
    });

    req.on('end', () => {
      const updatePost = JSON.parse(newData);
      let exist=false
      for (var post of posts) {
          if(post.id == updatePost.id){
              post.title = updatePost.title
              exist = true 
              break;
          }
      }
      if(exist){
        res.write(JSON.stringify({ message: 'post updated successfully', post: updatePost }));
        res.end();
      }else{
        res.write(JSON.stringify({ message: 'post not found' }));
        res.end();
      }
      })
  }
  //6- search post by id
  else if (req.method === 'GET' && req.url === '/searchPostById') {
    let postIdd ;
    req.on('data', chunk => {
      postIdd = chunk ;
    });

    req.on('end', () => {
    let searchedid = JSON.parse(postIdd)
    console.log(searchedid)
    const post = posts.find(post => post.id === searchedid.id);
    if (post) {
      res.write(JSON.stringify(post));
      res.end();
    } else {
      res.write(JSON.stringify({ message: 'post not found' }));
      res.end();
    }
      });
    
    }

  }).listen(port,()=>{
    console.log("server running ....... ");
})