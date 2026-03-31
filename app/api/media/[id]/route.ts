import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Media from '@/models/Media'
import { unlink } from 'fs/promises'
import { join } from 'path'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const media = await Media.findById(params.id)
    if (!media) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    try {
      await unlink(join(process.cwd(), 'public', media.url))
    } catch {}

    await Media.findByIdAndDelete(params.id)
    return NextResponse.json({ message: 'Deleted' })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const { alt } = await req.json()
    const media = await Media.findByIdAndUpdate(params.id, { alt }, { new: true })
    return NextResponse.json(media)
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
