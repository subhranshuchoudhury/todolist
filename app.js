const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let items = [];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/",function(req,res){
    let date = new Date();
    
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let dateString = date.toLocaleDateString("en-US",options);

    res.render('list',{kindOfDay: dateString,newListItems: items});
    // list --> list.ejs

});

app.post("/",function(req,res){

    items.push(req.body.newItem);
    res.redirect("/");
});




//*********************
app.listen(3000, function(){
    console.log("server started on port 3000");
});
