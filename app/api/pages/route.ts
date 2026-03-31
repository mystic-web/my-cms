import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Page from '@/models/Page'
import slugify from 'slugify'

export async function GET(req: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    
    const query = status ? { status } : {}
    const pages = await Page.find(query).sort({ updatedAt: -1 })
    return NextResponse.json(pages)
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

    // Generate unique slug
    let slug = slugify(data.title, { lower: true, strict: true })
    const existing = await Page.findOne({ slug })
    if (existing) {
      slug = `${slug}-${Date.now()}`
    }

    const page = await Page.create({ ...data, slug })
    return NextResponse.json(page, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
