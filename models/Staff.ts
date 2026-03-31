import mongoose, { Schema, Document } from 'mongoose'

export interface IStaff extends Document {
  name: string
  slug: string
  role: string
  department: string
  bio: string
  avatar: string
  email: string
  phone: string
  socialLinks: { platform: string; url: string }[]
  order: number
  status: 'draft' | 'published'
  createdAt: Date
  updatedAt: Date
}

const StaffSchema = new Schema<IStaff>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    role: { type: String, default: '' },
    department: { type: String, default: 'General' },
    bio: { type: String, default: '' },
    avatar: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    socialLinks: [{ platform: { type: String }, url: { type: String } }],
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  },
  { timestamps: true }
)

export default mongoose.models.Staff || mongoose.model<IStaff>('Staff', StaffSchema)
