import mongoose, { Schema, Document } from 'mongoose'

export interface IBranch extends Document {
  name: string
  slug: string
  address: string
  city: string
  state: string
  country: string
  zipCode: string
  phone: string
  email: string
  mapUrl: string
  image: string
  workingHours: string
  isHeadquarters: boolean
  order: number
  status: 'draft' | 'published'
  createdAt: Date
  updatedAt: Date
}

const BranchSchema = new Schema<IBranch>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    country: { type: String, default: '' },
    zipCode: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    mapUrl: { type: String, default: '' },
    image: { type: String, default: '' },
    workingHours: { type: String, default: '' },
    isHeadquarters: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  },
  { timestamps: true }
)

export default mongoose.models.Branch || mongoose.model<IBranch>('Branch', BranchSchema)
