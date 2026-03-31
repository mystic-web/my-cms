// app/photos/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import connectDB from '@/lib/mongodb'
import Photo from '@/models/Photo'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  await connectDB()
  const photo = await Photo.findOne({ slug: params.slug, status: 'published' })
  if (!photo) return {}
  return { title: photo.title + ' - GGIMS', description: photo.description || '' }
}

export default async function PhotoDetailPage({ params }: { params: { slug: string } }) {
  await connectDB()
  const photo = await Photo.findOne({ slug: params.slug, status: 'published' })
  if (!photo) notFound()

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b py-3 px-4">
        <div className="max-w-6xl mx-auto text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/photos" className="hover:text-blue-600">Photos</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium line-clamp-1">{photo.title}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{photo.title}</h1>

        {photo.description && (
          <p className="text-gray-600 mb-8">{photo.description}</p>
        )}

        {/* Cover image if no images array */}
        {photo.images?.length === 0 && photo.coverImage && (
          <div className="mb-8">
            <img src={photo.coverImage} alt={photo.title}
              className="w-full max-h-[500px] object-contain rounded-xl bg-white shadow" />
          </div>
        )}

        {/* Images Grid */}
        {photo.images?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {photo.images.map((img: any, idx: number) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow">
                <img
                  src={img.url}
                  alt={img.caption || photo.title}
                  className="w-full h-56 object-cover"
                />
                {img.caption && (
                  <p className="text-xs text-gray-500 px-3 py-2">{img.caption}</p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-10">
          <Link href="/photos"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Gallery
          </Link>
        </div>
      </div>
    </main>
  )
}