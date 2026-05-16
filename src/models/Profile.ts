import mongoose, { Schema, Document } from "mongoose";

export interface IProfile extends Document {
  user: mongoose.Types.ObjectId;
  profileId: string;

  // Step 1: Basic Info
  profileFor: "Self" | "Son" | "Daughter" | "Brother" | "Sister" | "Relative";
  gender: "Male" | "Female";
  dateOfBirth: Date;
  maritalStatus: "Never Married" | "Divorced" | "Widowed" | "Awaiting Divorce";
  height: number;
  bodyType?: "Slim" | "Average" | "Athletic" | "Heavy";
  diet: "Vegetarian" | "Non-Vegetarian" | "Eggetarian" | "Vegan";

  // Step 2: Religion & Astrology
  religion: string;
  community: string;
  motherTongue: string;
  caste?: string;
  subCaste?: string;
  gothram?: string;
  manglik?: "Yes" | "No" | "Don't Know";
  rashi?: string;
  nakshatra?: string;

  // Step 3: Family Details
  fatherOccupation: string;
  motherOccupation: string;
  brothers: number;
  brothersMarried: number;
  sisters: number;
  sistersMarried: number;
  familyType: "Nuclear" | "Joint" | "Extended";
  familyStatus: "Middle Class" | "Upper Middle Class" | "Rich" | "Affluent";
  familyValues: "Orthodox" | "Moderate" | "Liberal";

  // Step 4: Education & Career
  education: string;
  educationDetail?: string;
  employedIn: "Private" | "Government" | "Business" | "Self-Employed" | "Not Working";
  profession: string;
  companyName?: string;
  annualIncome?: string;

  // Step 5: Location & Lifestyle
  city: string;
  state: string;
  country: string;
  nativePlace?: string;
  smoking: "No" | "Occasionally" | "Yes";
  drinking: "No" | "Occasionally" | "Yes";

  // Step 6: About
  about: string;

  // Media
  photos: string[];

  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    profileId: { type: String, unique: true },

    // Step 1
    profileFor: { type: String, enum: ["Self", "Son", "Daughter", "Brother", "Sister", "Relative"] },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    dateOfBirth: { type: Date, required: true },
    maritalStatus: { type: String, required: true },
    height: { type: Number, required: true },
    bodyType: { type: String, enum: ["Slim", "Average", "Athletic", "Heavy"] },
    diet: { type: String, enum: ["Vegetarian", "Non-Vegetarian", "Eggetarian", "Vegan"] },

    // Step 2
    religion: { type: String, required: true },
    community: { type: String, required: true },
    motherTongue: { type: String, required: true },
    caste: { type: String },
    subCaste: { type: String },
    gothram: { type: String },
    manglik: { type: String, enum: ["Yes", "No", "Don't Know"] },
    rashi: { type: String },
    nakshatra: { type: String },

    // Step 3
    fatherOccupation: { type: String },
    motherOccupation: { type: String },
    brothers: { type: Number },
    brothersMarried: { type: Number },
    sisters: { type: Number },
    sistersMarried: { type: Number },
    familyType: { type: String, enum: ["Nuclear", "Joint", "Extended"] },
    familyStatus: { type: String, enum: ["Middle Class", "Upper Middle Class", "Rich", "Affluent"] },
    familyValues: { type: String, enum: ["Orthodox", "Moderate", "Liberal"] },

    // Step 4
    education: { type: String, required: true },
    educationDetail: { type: String },
    employedIn: { type: String, enum: ["Private", "Government", "Business", "Self-Employed", "Not Working"] },
    profession: { type: String, required: true },
    companyName: { type: String },
    annualIncome: { type: String },

    // Step 5
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    nativePlace: { type: String },
    smoking: { type: String, enum: ["No", "Occasionally", "Yes"] },
    drinking: { type: String, enum: ["No", "Occasionally", "Yes"] },

    // Step 6
    about: { type: String, required: true },

    // Media
    photos: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);
