const exp = require("constants");
const express=require("express");
const app=express();
const port=3000;
const path=require("path");

// This use for Delete and edit (after installing pakage in terminal -->  npm install method-override)
var methodOverride = require('method-override')

// This use generate some unique id (ater installing pakage -->npm i uuid <---)
const { v4: uuidv4 } = require('uuid');

// For EJS file access
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));

// This use for Delete and edit --> (PATCH AND DELETE)
app.use(methodOverride('_method'));

// app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

// Create an Array 
let posts=[
    {
        id:uuidv4(),
        username:"rohit123",
        content:"THis page belongs to rohit kumar patel!"
    },
    {
        id:uuidv4(),
        username:"anchal243",
        content:"THis page belongs to anchal patel"
    }
];

// GET Request
app.get("/posts",(req,res)=>{
    res.render("home.ejs",{posts});
   });

   // GET request for create new post --> (/posts/new)
 app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
   });

// POST request
   app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4(); 
     posts.push({id,username,content});
    res.redirect("/posts")
   });
// posts/:id request (access wuth id to any users)
   app.get("/posts/:id",(req,res)=>{
    let{id}=req.params;
    // finding and matching id with array id
    let postid=posts.find((p)=>id===p.id);
    // console.log(postid);
    // res.send("successfuly working this page...");
    res.render("show.ejs",{postid});
   });

 // Patch Request
   app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let newcontent=req.body.content;
    let postid=posts.find((p)=>id===p.id);
    postid.content=newcontent;
    console.log(postid);
    res.redirect("/posts");
    
   });

   // Update(edit) Request
   app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;
    let postid=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{id,postid});
    });

    // Deelete request
    app.delete("/posts/:id",(req,res)=>{
        let {id}=req.params;
        posts=posts.filter((p)=>id!==p.id);
        res.redirect("/posts"); 
        
    })

// For all another request sending response
app.get("*",(req,res)=>{
    res.send("Sorry! This page does not found.....");
   });

app.listen(port,()=>{
    console.log(`Listening the Port ${port}`);
});