import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  isVerified: boolean;
  role: "USER" | "ADMIN" | "ELITE";
  profileId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for OAuth (Google Login)
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String },
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: ["USER", "ADMIN", "ELITE"], default: "USER" },
    profileId: { type: Schema.Types.ObjectId, ref: "Profile" }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
