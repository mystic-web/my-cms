import mongoose, { Schema, Document } from 'mongoose'

export interface IVideo extends Document {
  title: string
  slug: string
  description: string
  videoUrl: string
  embedUrl: string
  thumbnailImage: string
  category: string
  subcategory: string
  duration: string
  tags: string[]
  status: 'draft' | 'published'
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

const VideoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    videoUrl: { type: String, default: '' },
    embedUrl: { type: String, default: '' },
    thumbnailImage: { type: String, default: '' },
    category: { type: String, default: 'General' },
    subcategory: { type: String, default: '' },
    duration: { type: String, default: '' },
    tags: [{ type: String }],
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true }
)

export default mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema)
