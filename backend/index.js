const express = require("express")
const cors =  require("cors")
const mongoose = require("mongoose")

const app = express()
app.use(cors())
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/gee')

const UserSchema = mongoose.Schema({
    name: String,
    age: Number
})
const UserModel = mongoose.model("users", UserSchema)

app.get("/getUsers", (req, res) => {
    UserModel.find({}).then(function(users) {
        res.json(users)
    }).catch(function(err) {
        console.log(err)
    })

})

app.listen(3001, () => {
    console.log("serve is running")
})