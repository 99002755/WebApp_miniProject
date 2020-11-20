//const app = require("express")();
const express=require("express");
const app=express();
app.use(express.static('images'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
app.get("/form.html", (req, res) => {
    res.sendFile(__dirname + "/form.html");
})
app.get("/login.html", (req, res) => {
    res.sendFile(__dirname + "/login.html");
})
app.get("/main.html", (req, res) => {
    res.sendFile(__dirname + "/main.html");
})
app.get("/search.html", (req, res) => {
    res.sendFile(__dirname + "/search.html");
})
 app.get("/admin.html", (req, res) => {
     res.sendFile(__dirname + "/admin.html");
 })
app.get("/about.html", (req, res) => {
    res.sendFile(__dirname + "/about.html");
})
app.get("/admin_Crud.html", (req, res) => {
    res.sendFile(__dirname + "/admin_Crud.html");
})
app.listen(3333, () => {
    console.log("Client App running at 3333");
})