import mongoose from "mongoose";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const invalidGmailDomains = [
  "gmil.com",
  "gamil.com",
  "gmail.co",
  "gmail.con",
  "gmail.cm",
];

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          if (!emailRegex.test(value)) return false;
          const domain = value.split("@")[1];
          return !invalidGmailDomains.includes(domain);
        },
      },
    },
    phone: {
      type: String,
      required: true,
    },

    // ✅ MUST BE PRESENT
    dob: {
      type: Date,
    },
    address: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
