import mongoose, { Schema, Document } from 'mongoose'

export interface IPartner extends Document {
  name: string
  slug: string
  description: string
  logo: string
  websiteUrl: string
  category: string
  order: number
  status: 'draft' | 'published'
  createdAt: Date
  updatedAt: Date
}

const PartnerSchema = new Schema<IPartner>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    logo: { type: String, default: '' },
    websiteUrl: { type: String, default: '' },
    category: { type: String, default: 'General' },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  },
  { timestamps: true }
)

export default mongoose.models.Partner || mongoose.model<IPartner>('Partner', PartnerSchema)
