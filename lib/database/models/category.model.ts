import { Document, Schema, model, models } from "mongoose";

export interface ICategory extends Document {
  _id: string;
  type: string;
  name: string;
}

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true },
})

const Category = models.Category || model('Category', CategorySchema);

export default Category;