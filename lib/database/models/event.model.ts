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
  albumFiles?: [
    {
      i: number,
      name: string,
      url: string
    }
  ],
  videoUrl?: string,
  views: number;
  type: string;
  isFree: boolean;
  category?: string
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  description: { type: String },
  genre: { type: Schema.Types.ObjectId, ref: 'Genre' },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  audioUrl: { type: String },
  albumFiles: [
    {
      i: { type: Number },
      name: { type: String },
      url: { type: String }
    }
  ],
  videoUrl: { type: String },
  views: { type: Number, default: 0 },
  type: { type: String },
  isFree: { type: Boolean, default: false },
  category: { type: String },
})

const Event = models.Event || model('Event', EventSchema);

export default Event;