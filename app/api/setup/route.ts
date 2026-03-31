import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export async function POST(req: Request) {
  try {
    await connectDB()
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' })
    if (existingAdmin) {
      return NextResponse.json({ error: 'Admin already exists' }, { status: 400 })
    }

    const { name, email, password } = await req.json()

    const hashedPassword = await bcrypt.hash(password, 12)
    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
    })

    return NextResponse.json({ message: 'Admin created successfully', id: admin._id })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectDB()
    const adminExists = await User.findOne({ role: 'admin' })
    return NextResponse.json({ setupRequired: !adminExists })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
