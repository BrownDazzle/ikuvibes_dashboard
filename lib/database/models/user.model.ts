import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  image: { type: String },
  accessToken: { type: String },
  socialUrl: {
    facebook: { type: String },
    youtube: { type: String },
    instagram: { type: String },
  },
})

const User = models.User || model('User', UserSchema);

export default User;