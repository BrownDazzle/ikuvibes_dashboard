import { Document, Schema, model, models } from "mongoose";

export interface IVideo extends Document {
    _id: string;
    title: string;
    description?: string;
    genre: { _id: string, name: string, type: string };
    createdAt: Date;
    imageUrl: string;
    videoUrl?: string,
    youtubeVideoId: string,
    category: { _id: string, name: string, type: string }
}

const VideoSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    genre: { type: Schema.Types.ObjectId, ref: 'Genre' },
    createdAt: { type: Date, default: Date.now },
    imageUrl: { type: String },
    youtubeVideoId: { type: String }, // Use the actual property for YouTube video ID
    userId: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
})

const Video = models.Video || model('Video', VideoSchema);

export default Video;