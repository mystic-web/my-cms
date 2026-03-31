import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
    console.log('=== UPLOAD START ===')

    const session = await getServerSession(authOptions)
    console.log('Session:', session ? 'OK' : 'NULL - Unauthorized')
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    console.log('Parsing formData...')
    let formData: FormData
    try {
      formData = await req.formData()
      console.log('FormData parsed OK')
    } catch (e: any) {
      console.error('FormData error:', e.message)
      return NextResponse.json({ error: 'FormData failed: ' + e.message }, { status: 400 })
    }

    const file = formData.get('file') as File | null
    console.log('File:', file ? `${file.name} | ${file.size} bytes | ${file.type}` : 'NULL')

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/svg+xml', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      console.error('Bad type:', file.type)
      return NextResponse.json({ error: 'Invalid file type: ' + file.type }, { status: 400 })
    }

    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Max 20MB.' }, { status: 400 })
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    console.log('Upload dir:', uploadDir, '| Exists:', existsSync(uploadDir))

    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
      console.log('Created upload dir')
    }

    const ext = path.extname(file.name) || '.jpg'
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase().slice(0, 50)
    const uniqueName = `${baseName}-${Date.now()}${ext}`
    const filePath = path.join(uploadDir, uniqueName)
    console.log('Saving to:', filePath)

    const bytes = await file.arrayBuffer()
    await writeFile(filePath, Buffer.from(bytes))
    console.log('=== UPLOAD SUCCESS ===', uniqueName)

    return NextResponse.json({ url: `/uploads/${uniqueName}` }, { status: 201 })

  } catch (error: any) {
    console.error('=== UPLOAD FAILED ===', error.message, error.stack)
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 })
  }
}