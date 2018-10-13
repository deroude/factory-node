import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";

export interface UserModel extends mongoose.Document {
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;

  githubId: string;
  tokens: AuthToken[];

  comparePassword: (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;
  gravatar: (size: number) => string;
}

export interface AuthToken {
  accessToken: string;
  kind: string;
}

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,

  githubId: String
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre<UserModel>("save", function save(next: any) {
  const user = this;
  if (!user.isModified("password")) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});


userSchema.methods.comparePassword = (candidatePassword, cb) =>
  bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) =>
    cb(err, isMatch));


/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = (size: number) => {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash("md5").update(this.email).digest("hex");
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

// export const User: UserType = mongoose.model<UserType>('User', userSchema);
export const User: mongoose.Model<UserModel> = mongoose.model<UserModel>("User", userSchema);