import { Document, Schema, model, models } from "mongoose";

export interface IGenre extends Document {
  _id: string;
  type: string;
  name: string;
}

const GenreSchema = new Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true },
})

const Genre = models.Genre || model('Genre', GenreSchema);

export default Genre;