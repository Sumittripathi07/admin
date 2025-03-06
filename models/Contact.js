import { Schema, model, models } from "mongoose";

const ContactSchema = new Schema({
  username: {
    type: String, 
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Contact = models?.Contact || model("Contact", ContactSchema);