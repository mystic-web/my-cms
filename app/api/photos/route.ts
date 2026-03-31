import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Photo from '@/models/Photo'
import slugify from 'slugify'

export async function GET(req: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const query: any = {}
    if (status) query.status = status
    const items = await Photo.find(query).sort({ createdAt: -1 })
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

    // Title validation
    if (!data.title || !data.title.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    let slug = slugify(data.title.trim(), { lower: true, strict: true })
    if (!slug) slug = `gallery-${Date.now()}`

    const existing = await Photo.findOne({ slug })
    if (existing) slug = `${slug}-${Date.now()}`

    const publishedAt = data.status === 'published' ? new Date() : null
    const item = await Photo.create({ ...data, slug, publishedAt })
    return NextResponse.json(item, { status: 201 })

  } catch (error: any) {
    console.error('Photo save error:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}