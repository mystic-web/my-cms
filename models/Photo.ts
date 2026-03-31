import mongoose, { Schema, Document } from 'mongoose'

export interface IPhoto extends Document {
  title: string
  slug: string
  description: string
  images: { url: string; caption: string }[]
  coverImage: string
  album: string
  tags: string[]
  status: 'draft' | 'published'
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

const PhotoSchema = new Schema<IPhoto>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    images: [{ url: { type: String }, caption: { type: String, default: '' } }],
    coverImage: { type: String, default: '' },
    album: { type: String, default: 'General' },
    tags: [{ type: String }],
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true }
)

export default mongoose.models.Photo || mongoose.model<IPhoto>('Photo', PhotoSchema)
