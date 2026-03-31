import mongoose, { Schema, Document } from 'mongoose'

export interface IPage extends Document {
  title: string
  slug: string
  content: string
  htmlCode: string
  cssCode: string
  jsCode: string
  metaTitle: string
  metaDescription: string
  featuredImage: string
  status: 'draft' | 'published'
  createdAt: Date
  updatedAt: Date
}

const PageSchema = new Schema<IPage>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, default: '' },
    htmlCode: { type: String, default: '' },
    cssCode: { type: String, default: '' },
    jsCode: { type: String, default: '' },
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    featuredImage: { type: String, default: '' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  },
  { timestamps: true }
)

export default mongoose.models.Page || mongoose.model<IPage>('Page', PageSchema)