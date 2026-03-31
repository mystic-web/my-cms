import mongoose, { Schema, Document } from 'mongoose'

export interface IAudio extends Document {
  title: string
  slug: string
  description: string
  audioUrl: string
  coverImage: string
  category: string
  subcategory: string
  duration: string
  artist: string
  tags: string[]
  status: 'draft' | 'published'
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

const AudioSchema = new Schema<IAudio>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    audioUrl: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    category: { type: String, default: 'General' },
    subcategory: { type: String, default: '' },
    duration: { type: String, default: '' },
    artist: { type: String, default: 'Admin' },
    tags: [{ type: String }],
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true }
)

export default mongoose.models.Audio || mongoose.model<IAudio>('Audio', AudioSchema)
