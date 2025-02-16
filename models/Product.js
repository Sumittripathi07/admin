import mongoose, { model, Schema, models } from "mongoose";

const ProductSchema = new Schema({
  id: String,
  name: String,
  company: String,
  price: Number,
  colors: [String],
  image: String,
  description: String,
  category: String,
  featured: Boolean,
  shipping: Boolean,
});

export const Product = models.Product || model("Product", ProductSchema);
