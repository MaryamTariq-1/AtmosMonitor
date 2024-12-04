const express = require("express")
const cors =  require("cors")
const mongoose = require("mongoose")
const UserModel = require ("./models/Users")
const app = express()
app.use(cors())
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/AtmosMonitor")


app.post('/user', (req, res) => {
    UserModel.create(req.body).then(user => res.json(user))
    .catch(err=>res.json(err))
})


app.get("/getUsers", (req, res) => {
  userModel
    .find({})
    .then(function (users) {
      res.json(users);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.listen(3001, () => {
  console.log("serve is running");
});


