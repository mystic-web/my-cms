// app/photos/page.tsx
import Link from 'next/link'
import connectDB from '@/lib/mongodb'
import Photo from '@/models/Photo'

export const metadata = { title: 'Photos - GGIMS', description: 'Gallery' }

export default async function PhotosPage() {
  await connectDB()
  const photos = await Photo.find({ status: 'published' }).sort({ createdAt: -1 })

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b py-3 px-4">
        <div className="max-w-6xl mx-auto text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">Photos</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Photos Gallery</h1>

        {photos.length === 0 ? (
          <p className="text-gray-500">No photos found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {photos.map((photo: any) => (
              <Link key={photo._id} href={`/photos/${photo.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  {photo.coverImage ? (
                    <img
                      src={photo.coverImage}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {photo.images?.length > 0 && (
                    <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                      {photo.images.length} photos
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {photo.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}