import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    password: {
      type: String,
      required: true,
      minlenght: [20, "the minimum lenght for password is 10"],
    },
    email: {
      type: String,
      required: [true, "please enter your email address"],
      unique: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "please provide a valid email",
      ],
    },
    is_admin: { type: Boolean, default: false },
    phone_number: { type: Number, dafault: 0 },
    posts: [{ type: mongoose.Schema.ObjectId, ref: "Post" }],
    clubs: [{ type: mongoose.Schema.ObjectId, ref: "Club" }],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (userpassword) {
  const checked = await bcrypt.compare(userpassword, this.password);
  return checked;
};

userSchema.methods.generateToken = function () {
  return jwt.sign(
    { userId: this._id, first_name: this.first_name },
    process.env.JWT_SECRET,
    { expiresIn: "3d" }
  );
};

const User = mongoose.model("User", userSchema);
export default User;
