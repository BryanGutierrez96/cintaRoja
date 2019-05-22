const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const SALT_FACTOR = 10
const DB_URL =
  "mongodb+srv://bryangutierrez:hola@cluster0-n8yrz.mongodb.net/login?retryWrites=true";
mongoose.connect(DB_URL, { useNewUrlParser: true }, err => {
  !err ? console.log("DB conexion exitosa") : console.log(err);
});
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true
    },
    apellido: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    actividad: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);
userSchema.pre('save', function (next) {
    let user = this
    if (!user.isModified('password')) { return next() }
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
      if (err) return next(err)
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err)
        user.password = hash
        next()
      })
    })
  })
  
  userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) return cb(err)
      cb(null, isMatch)
    })
  }


const User = mongoose.model("User", userSchema);
module.exports = {
  User
};
