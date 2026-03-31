// app/news/page.tsx
import Link from 'next/link'
import connectDB from '@/lib/mongodb'
import News from '@/models/News'

export const metadata = { title: 'News - GGIMS', description: 'Latest news' }

export default async function NewsPage() {
  await connectDB()
  const newsList = await News.find({ status: 'published' }).sort({ publishedAt: -1 })

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b py-3 px-4">
        <div className="max-w-6xl mx-auto text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">News</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Latest News</h1>

        {newsList.length === 0 ? (
          <p className="text-gray-500">No news found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsList.map((news: any) => (
              <Link key={news._id} href={`/news/${news.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow">
                {news.coverImage && (
                  <div className="h-48 overflow-hidden">
                    <img src={news.coverImage} alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {news.title}
                  </h3>
                  {news.excerpt && (
                    <p className="text-gray-500 text-sm line-clamp-2">{news.excerpt}</p>
                  )}
                  {news.publishedAt && (
                    <p className="text-xs text-gray-400 mt-3">
                      {new Date(news.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}