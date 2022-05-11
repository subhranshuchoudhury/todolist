const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let items = ["coding","eat","sleep"];
let workItems = [];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static("public"));

app.get("/",function(req,res){
    let date = new Date();
    
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let dateString = date.toLocaleDateString("en-US",options);

    res.render('list',{listTitle: dateString,newListItems: items});
    // list --> list.ejs

});

app.post("/",function(req,res){
    let item = req.body.newItem;

    if (req.body.List === "Work") {
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }

});

app.get("/work",function(req,res){
    res.render('list',{listTitle: "Work",newListItems: workItems});
});

app.post("/work",function(req,res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.get("/about",(req,res)=>{
    res.render('about');
})




//*********************
app.listen(process.env.PORT || 3000, function(){
    console.log("Server Live Here: http://localhost:3000/");
});
