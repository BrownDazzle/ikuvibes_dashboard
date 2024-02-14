import { Document, Schema, model, models } from "mongoose";

export interface IEvent extends Document {
  _id: string;
  title: string;
  artist: string;
  description?: string;
  genre: { _id: string, name: string, type: string };
  createdAt: Date;
  imageUrl: string;
  audioUrl?: string,
  videoUrl?: string,
  views: number;
  likes: number;
  isFree: boolean;
  socialUrl?: {
    facebook?: string;
    youtube?: string;
    instagram?: string;
  };
  category: { _id: string, name: string, type: string }
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  description: { type: String },
  genre: { type: Schema.Types.ObjectId, ref: 'Genre' },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  audioUrl: { type: String },
  videoUrl: { type: String },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  isFree: { type: Boolean, default: false },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
})

const Event = models.Event || model('Event', EventSchema);

export default Event;