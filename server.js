const app=require('express')();
const parser=require("body-parser");

const fs = require('fs');
const {dirname}=require('path');
app.use(parser.urlencoded({extended:true}));
app.use(parser.json());

var users=[];
var course = [];
function saveUsers(){
    const filename = "registerdata.json";
    const jsonData = JSON.stringify(users);
    fs.writeFileSync(filename, jsonData, 'utf-8');
}
//let lon=document.querySelector('#login')
//document.body.style.backgroundImage="url('bg.jpg')";
function fillData(){
    users=JSON.parse(fs.readFileSync("./registerdata.json","utf-8"));
}
app.post("/users",(req,res)=>{
    //reading the data from the form
    let body = req.body;//parsed data from the POST...
    users.push(body);  
    saveUsers();//updating to the JSON file...
    res.send("User registered successfully");
    

})


// app.get("/search1", function(req, res)
// {
//     fillData();
// console.log(users);
// res.send(JSON.stringify(users));
// })    
app.get("/searchByCourse", function(req, res)
{
    //res.send("im here");
    // var searchCourse = [];
    // var details = req.params.name;
    // if(users.length==0)
    //     fillData()
    // users.forEach(element =>
    // {
    //     if(details == element.course)
    //     {
    //         searchCourse.push(element);
    //     }
    // });
    // if(searchCourse.length==0)
    //   {
    //       var msg="No course";
    //       res.send(msg);
    //   }
    //  else{
    //     res.send(searchCourse);
    //  }
    fillData();
    res.send(JSON.stringify(users));
     
})
//admin server


function readData(){
    const filename = "course.json";//new file... 
    const jsonContent = fs.readFileSync(filename, 'utf-8');
    course = JSON.parse(jsonContent);
}
 
function saveData(){
    const filename = "course.json";
    const jsonData = JSON.stringify(course);
    fs.writeFileSync(filename, jsonData, 'utf-8');
}
app.get("/course", (req, res)=>{
    readData();
    res.send(JSON.stringify(course));    
})
 
app.get("/course/:id", (req, res)=>{
    const courseid = req.params.id;
    if(course.length == 0){
        readData();
    }
    let foundRec = course.find((e) => e.courseId == courseid);
    if(foundRec == null)
        throw "course not found";
    res.send(JSON.stringify(foundRec))
})
 
app.put("/course", (req, res)=>{
    if(course.length == 0)
        readData();//Fill the array if it is not loaded....
    let body = req.body;
    //iterate thro the collection
    for (let index = 0; index < course.length; index++) { 
        let element = course[index];
        if (element.courseId == body.courseId) {//find the matching record
            element.courseTitle = body.courseTitle;
            // element.bookAuthor = body.bookAuthor;
            
            saveData();
            res.send("Course updated successfully");
        }
    }
    //update the data
    //exit the function....
})
 
app.post('/course', (req, res)=>{
    //res.send("iam here");
    // if (course.length == 0){
    //     //res.send("iam here");
    //      readData();
    // res.send("iam late"); 
    //  }//Fill the array if it is not loaded....
    console.log(course);
    let body = req.body;//parsed data from the POST...
    course.push(body);  
    saveData();//updating to the JSON file...
    res.send("course added successfully");
})
/*
app.delete("/books/:id", (req, res)=>{
const reqid=req.params.id;
const index=indexOf(reqid);
books.splice(index,1);
if(err)
res.send(err);
res.json(books);
})
*/
app.delete("/course/:id", (req, res) => {
    if (course.length == 0)
        readData(); 
    //let body = req.body; 
    var flag=1;
    const courseid = req.params.id;
    for (let index = 0; index < course.length; index++) {
        let element = course[index];
        if (element.courseId == courseid) { 
            users.splice(index,1);
            res.send("Course Deleted Successfully");
            saveData();
            readData();
            flag = 0;
        }
     }
     if (flag >= 1) {
        res.send("Error in Deleting");
    }
})
app.listen(4321,()=>{
    console.log("Running at 4321");
})
