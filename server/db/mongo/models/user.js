/**
 * Defining a User Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */
import mongoose from 'mongoose';

// Other oauthtypes to be added

/*
 User Schema
 */

const UserSchema = new mongoose.Schema({
  tokens:{
      youtube:{
          refreshToken:String,
          accessToken: String
      }
  },
  profile: {
      name: { type: String, default: '' },
      picture: { type: String, default: '' }
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  google: String
});

export default mongoose.model('User', UserSchema);
