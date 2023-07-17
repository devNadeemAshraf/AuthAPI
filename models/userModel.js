// import dotenv from "dotenv";
// dotenv.config();

import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import { generateJWT } from "../utils/helper.js";

/**@description Import User Schema */
import userSchema from "../schema/userSchema.js";

/**
 * @description Schema Methods here
 */

/**
 * @description This is run whenever a User is created or .save() function is called
 */
userSchema.pre("save", async function (next) {
  console.log("pre-save called");
});

/**
 * @description Perform all necessary operations that need to happen after registering a user
 */
userSchema.methods.performPostRegisterOperations = async function () {
  // Set Profile Avatar
  if (this.name.trim().includes(" ")) {
    this.profile_image =
      process.env.DICE_BEAR_AVATAR_BASE_URI + this.name.replaceAll(" ", "");
  } else {
    this.profile_image = process.env.DICE_BEAR_AVATAR_BASE_URI + this.name;
  }

  // Create a Default Avatar Field so that if the user removes their custom avatar, it can be reverted back
  this.default_profile_image = this.profile_image;
};

/**
 * @description Set User Session
 */
userSchema.methods.setSession = async function () {
  let session = {
    token: null,
    expires_in: 0,
    expires_on: null,
  };

  const jwtObj = await generateJWT(this._id);
  session = {
    token: jwtObj.token,
    expires_in: jwtObj.expires_in,
    expires_on: jwtObj.expires_on,
  };

  this.session = session;
};

/**
 * @description Attach a function to this Schema which checks if the Password entered is the correct password
 * @param {*} enteredPassword
 * @returns
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
