import mongoose from "../config/DBHelper";

const Schema = mongoose.Schema

const UserSchema = new Schema({
  'username': { type: String },
  'name': {type: String},
  'password': { type: String },
  'created': { type: Date }
})

const UserModel = mongoose.model('users', UserSchema)

export default UserModel