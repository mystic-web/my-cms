// app/videos/frames-in-motion/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import connectDB from '@/lib/mongodb'
import Video from '@/models/Video'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  await connectDB()
  const video = await Video.findOne({ slug: params.slug, status: 'published' })
  if (!video) return {}
  return { title: video.title + ' - GGIMS', description: video.description || '' }
}

export default async function VideoDetailPage({ params }: { params: { slug: string } }) {
  await connectDB()
  const video = await Video.findOne({ slug: params.slug, status: 'published' })
  if (!video) notFound()

  const related = await Video.find({ status: 'published', _id: { $ne: video._id } })
    .sort({ createdAt: -1 }).limit(6).lean()

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-blue-900 text-white py-10 px-4 text-center">
        <h1 className="text-2xl font-bold mb-2">Frames in Motion</h1>
        <p className="text-sm text-blue-200">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/videos" className="hover:underline">Videos</Link>
          <span className="mx-2">/</span>
          <Link href="/videos/frames-in-motion" className="hover:underline">Frames in Motion</Link>
          <span className="mx-2">/</span>
          <span className="line-clamp-1">{video.title}</span>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-gray-800 mb-5">{video.title}</h1>

          {/* Video Player */}
          {video.embedUrl ? (
            <div className="aspect-video rounded-xl overflow-hidden bg-black mb-6 shadow-lg">
              <iframe src={video.embedUrl} className="w-full h-full" allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
            </div>
          ) : video.videoUrl ? (
            <div className="mb-6">
              <video src={video.videoUrl} controls className="w-full rounded-xl shadow-lg" />
            </div>
          ) : video.thumbnailImage ? (
            <img src={video.thumbnailImage} alt={video.title}
              className="w-full rounded-xl mb-6 shadow-lg" />
          ) : null}

          {/* Description */}
          {video.description && (
            <div className="prose prose-lg max-w-none text-gray-700 mb-6"
              dangerouslySetInnerHTML={{ __html: video.description }} />
          )}

          <Link href="/videos/frames-in-motion" className="text-blue-600 hover:underline text-sm">
            ← Back to Videos
          </Link>
        </div>

        {/* Sidebar - Related Videos */}
        <div className="w-full lg:w-80 shrink-0 space-y-6">
          {related.length > 0 && (
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="font-bold text-gray-800 text-base mb-4 border-b pb-2">More Videos</h3>
              <div className="space-y-4">
                {related.map((v: any) => (
                  <Link key={v._id.toString()} href={`/videos/frames-in-motion/${v.slug}`}
                    className="flex gap-3 hover:opacity-80 transition-opacity group">
                    <div className="relative w-20 h-14 shrink-0 bg-gray-100 rounded overflow-hidden">
                      {v.thumbnailImage ? (
                        <img src={v.thumbnailImage} alt={v.title}
                          className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-800">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {v.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-bold text-gray-800 text-base mb-3 border-b pb-2">Canada Immigration</h3>
            <ul className="space-y-2">
              {[['Canada Express Entry', '/canada-express-entry'], ['Canada PNP', '/canada-pnp'],
                ['CRS Calculator', '/crs-calculator'], ['Canada PR Benefits', '/canada-pr-benefits']].map(([label, href]) => (
                <li key={href}><a href={href} className="text-sm text-blue-600 hover:underline">• {label}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}