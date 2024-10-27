const express = require("express")
const cors =  require("cors")
const mongoose = require("mongoose")
const UserModel = require ("./models/Users")
const app = express()
app.use(cors())
app.use(express.json());
mongoose.connect(
    "mongodb+srv://maryam:xduSdwEhTiASwiyv@atmosmonitor.vvtdw.mongodb.net/AtmosMonitor?retryWrites=true&w=majority&appName=AtmosMonitor"
)



app.get("/getUsers", (req, res) => {
    userModel.find({}).then(function(users) {
        res.json(users)
    }).catch(function(err) {
        console.log(err)
    })

})

app.listen(3001, () => {
    console.log("serve is running")
})