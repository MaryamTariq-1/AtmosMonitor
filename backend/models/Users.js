const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

// Define user schema with enhanced validation
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"],
    validate: {
      validator: function (value) {
        return (
          /[a-z]/.test(value) && // lowercase letters
          /[A-Z]/.test(value) && // uppercase letters
          /\d/.test(value) && // digits
          /[!@#$%^&*(),.?":{}|<>]/.test(value) // special characters
        );
      },
      message:
        "Password must contain uppercase, lowercase, digit, and special character",
    },
  },
}, { timestamps: true });

// Password hashing middleware (efficient handling)
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(12); // recommended complexity is 12 rounds
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Password verification method (reusable in controllers)
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
