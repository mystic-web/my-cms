import mongoose, { Schema, Document } from 'mongoose'

export interface IMedia extends Document {
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  alt: string
  createdAt: Date
}

const MediaSchema = new Schema<IMedia>({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  url: { type: String, required: true },
  alt: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Media || mongoose.model<IMedia>('Media', MediaSchema)
