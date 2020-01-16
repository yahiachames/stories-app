const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

userSchema.pre("save", function(next) {
  if (this.password && !this.isModified(password)) {
    const salt = bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(this.password, salt, function(err, hash) {
        this.password = hash;
        next();
      });
    });
  } else next();
});

module.exports = mongoose.model("User", userSchema);
