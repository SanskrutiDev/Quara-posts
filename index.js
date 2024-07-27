const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodoverride = require("method-override");



app.use(express.urlencoded({ extended: true }));
app.use(methodoverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id:uuidv4() ,
        username: "sanskruti chavan",
        content: "donts stop until you proud"
    },
    {
        id:uuidv4(),
        username: "shashwat chavan",
        content: "hard work is important to achive success"
    },
    {
        id:uuidv4(),
        username: "shubham samudre",
        content: "i love you and i belive you,you achive the best"
    }
];

app.get("/posts", (req, res) => {

    res.render("index", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new");
});
app.get("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
})
app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    console.log(id);
    let newcontent = req.body.content;
    console.log(newcontent);
    let post = posts.find((p)=>id===p.id);
    post.content =newcontent;
    console.log(post);
    res.redirect("/posts");

    console.log("patch is working");
})
app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("edit.ejs",{posts});
})

app.post("/posts", (req, res) => {
   let{username,content}=req.body;
   let id=uuidv4();
   posts.push({id, username,content })
    res.redirect("/posts");
});
app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params;
     posts = posts.filter((p)=>id !== p.id);
     res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
