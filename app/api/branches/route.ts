import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Branch from '@/models/Branch'
import slugify from 'slugify'

export async function GET(req: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const query: any = {}
    if (status) query.status = status
    const items = await Branch.find(query).sort({ order: 1, createdAt: -1 })
    return NextResponse.json(items)
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    await connectDB()
    const data = await req.json()
    let slug = slugify(data.name, { lower: true, strict: true })
    const existing = await Branch.findOne({ slug })
    if (existing) slug = `${slug}-${Date.now()}`
    const item = await Branch.create({ ...data, slug })
    return NextResponse.json(item, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
