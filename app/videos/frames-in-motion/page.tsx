// app/videos/frames-in-motion/page.tsx
import Link from 'next/link'
import connectDB from '@/lib/mongodb'
import Video from '@/models/Video'

export const metadata = { title: 'Frames in Motion - GGIMS', description: 'Watch our latest videos' }

export default async function FramesInMotionPage() {
  await connectDB()
  const videos = await Video.find({ status: 'published', category: 'frames-in-motion' }).sort({ createdAt: -1 }).lean()

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-blue-900 text-white py-10 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">Frames in Motion</h1>
        <p className="text-sm text-blue-200">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/videos" className="hover:underline">Videos</Link>
          <span className="mx-2">/</span>
          <span>Frames in Motion</span>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
        {/* Main Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {videos.map((video: any) => (
              <Link key={video._id.toString()} href={`/videos/frames-in-motion/${video.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow">
                <div className="relative h-44 bg-gray-100 overflow-hidden">
                  {video.thumbnailImage ? (
                    <img src={video.thumbnailImage} alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <svg className="w-10 h-10 text-white opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-700 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {video.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {videos.length === 0 && (
            <p className="text-center text-gray-500 py-20">No videos found.</p>
          )}

          <p className="text-sm text-gray-400 mt-6">
            1 - {videos.length} of ({videos.length}) records
          </p>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-72 shrink-0 space-y-6">
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-bold text-gray-800 text-base mb-3 border-b pb-2">Canada Immigration</h3>
            <ul className="space-y-2">
              {[['Canada Express Entry', '/canada-express-entry'], ['Canada PNP', '/canada-pnp'],
                ['Canada Super Visa', '/canada-super-visa'], ['CRS Calculator', '/crs-calculator'],
                ['Canada PR Benefits', '/canada-pr-benefits']].map(([label, href]) => (
                <li key={href}><a href={href} className="text-sm text-blue-600 hover:underline">• {label}</a></li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-bold text-gray-800 text-base mb-3 border-b pb-2">Australia Immigration</h3>
            <ul className="space-y-2">
              {[['Australia PR Visa', '/australia-pr-visa'], ['Australia Tourist Visa', '/australia-tourist-visa'],
                ['Australia Spouse Visa', '/australia-spouse-visa']].map(([label, href]) => (
                <li key={href}><a href={href} className="text-sm text-blue-600 hover:underline">• {label}</a></li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-bold text-gray-800 text-base mb-3 border-b pb-2">Important Links</h3>
            <ul className="space-y-2">
              {[['Germany Opportunity Card', '/germany-opportunity-card'],
                ['Portugal Job Seeker Visa', '/portugal-job-seeker-visa'],
                ['Contact Us', '/contact'], ['Blog', '/blog']].map(([label, href]) => (
                <li key={href}><a href={href} className="text-sm text-blue-600 hover:underline">• {label}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}