import mongoose, { Schema, Document } from 'mongoose'

export interface INews extends Document {
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  tags: string[]
  category: string
  author: string
  source: string
  status: 'draft' | 'published'
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

const NewsSchema = new Schema<INews>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, default: '' },
    content: { type: String, default: '' },
    featuredImage: { type: String, default: '' },
    tags: [{ type: String }],
    category: { type: String, default: 'General' },
    author: { type: String, default: 'Admin' },
    source: { type: String, default: '' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true }
)

export default mongoose.models.News || mongoose.model<INews>('News', NewsSchema)
