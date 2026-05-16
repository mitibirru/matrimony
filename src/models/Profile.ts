import mongoose, { Schema, Document } from "mongoose";

export interface IProfile extends Document {
  user: mongoose.Types.ObjectId;
  profileId: string; // Friendly unique ID like MAT12345
  
  // Basic Details
  gender: "Male" | "Female";
  dateOfBirth: Date;
  maritalStatus: "Never Married" | "Divorced" | "Widowed" | "Awaiting Divorce";
  height: number; // in cm
  
  // Religion & Astro
  religion: string;
  community: string;
  motherTongue: string;
  caste?: string;
  gothram?: string;
  manglik?: "Yes" | "No" | "Don't Know";
  
  // Location
  city: string;
  state: string;
  country: string;
  
  // Professional
  education: string;
  profession: string;
  annualIncome?: string;
  
  // Media & Bio
  about: string;
  photos: string[]; // Array of URL strings
  
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    profileId: { type: String, unique: true },
    
    gender: { type: String, enum: ["Male", "Female"], required: true },
    dateOfBirth: { type: Date, required: true },
    maritalStatus: { type: String, required: true },
    height: { type: Number, required: true },
    
    religion: { type: String, required: true },
    community: { type: String, required: true },
    motherTongue: { type: String, required: true },
    caste: { type: String },
    gothram: { type: String },
    manglik: { type: String, enum: ["Yes", "No", "Don't Know"] },
    
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    
    education: { type: String, required: true },
    profession: { type: String, required: true },
    annualIncome: { type: String },
    
    about: { type: String, required: true },
    photos: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);
