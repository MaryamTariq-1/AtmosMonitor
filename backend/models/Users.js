const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Duplicate email prevent karega
  },
  password: {
    type: String,
    required: true,
  },
});

// Password encrypt karne ke liye middleware
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10); // Hash with bcrypt
  }
  next();
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
