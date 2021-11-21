const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  work: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  messages: [
    {
      name: {
        type: "string",
        required: true,
      },
      email: {
        type: "string",
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      message: {
        type: "string",
        required: true,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// Middle Ware start

// Adding Tokens
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    res.send("The Error Page " + error);
  }
};

// Adding Messages
userSchema.methods.addMessage = async function (name, email, phone, message) {
  try {
    this.messages = this.messages.concat({ name, email, phone, message });
    await this.save();
    return messages;
  } catch (error) {
    console.log(error);
  }
};

// Pre function that work before save() use for hashing here
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

const User = mongoose.model("USER", userSchema);

module.exports = User;
