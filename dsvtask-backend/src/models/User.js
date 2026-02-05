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
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          if (!emailRegex.test(value)) return false;

          const domain = value.split("@")[1];
          return !invalidGmailDomains.includes(domain);
        },
        message: "Please enter a valid email address",
      },
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^[6-9]\d{9}$/, "Please enter a valid phone number"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
