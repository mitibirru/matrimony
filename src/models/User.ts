import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  isVerified: boolean;
  emailVerified: boolean;
  role: "USER" | "ADMIN" | "ELITE";
  profileId?: mongoose.Types.ObjectId;
  resetToken?: string;
  resetTokenExpiry?: Date;
  verificationToken?: string;
  verificationTokenExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, unique: true, sparse: true }, // sparse allows multiple nulls
    password: { type: String },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    phone: { type: String },
    isVerified: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
    role: { type: String, enum: ["USER", "ADMIN", "ELITE"], default: "USER" },
    profileId: { type: Schema.Types.ObjectId, ref: "Profile" },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
    verificationToken: { type: String },
    verificationTokenExpiry: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
