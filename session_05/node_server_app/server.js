const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());




// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/myschool_db")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});




app.use("/api/users",userRoutes);



app.get("/", (req, res) => {
    res.send("Hello from Node Server!");
});



app.get("/register", (req, res) => {
    res.send("Hello from Node Server! from register route");
});

app.get("/login", (req, res) => {
    res.send("Hello from Node Server! from login route");
});





app.listen(5000,()=>{
    console.log("Server running on port 5000");
});