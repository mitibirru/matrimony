import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  isVerified: boolean;
  role: "USER" | "ADMIN" | "ELITE";
  profileId?: mongoose.Types.ObjectId;
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
    role: { type: String, enum: ["USER", "ADMIN", "ELITE"], default: "USER" },
    profileId: { type: Schema.Types.ObjectId, ref: "Profile" }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
