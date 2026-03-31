// app/news/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import connectDB from '@/lib/mongodb'
import News from '@/models/News'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  await connectDB()
  const news = await News.findOne({ slug: params.slug, status: 'published' })
  if (!news) return {}
  return {
    title: news.seoTitle || news.title + ' - GGIMS',
    description: news.seoDescription || news.excerpt || '',
  }
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  await connectDB()
  const news = await News.findOne({ slug: params.slug, status: 'published' })
  if (!news) notFound()

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b py-3 px-4">
        <div className="max-w-4xl mx-auto text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/news" className="hover:text-blue-600">News</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">{news.title}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{news.title}</h1>

        {news.publishedAt && (
          <p className="text-sm text-gray-400 mb-6">
            {new Date(news.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        )}

        {news.coverImage && (
          <img src={news.coverImage} alt={news.title}
            className="w-full max-h-[400px] object-cover rounded-xl mb-8 shadow" />
        )}

        {news.content && (
          <div className="prose prose-lg max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: news.content }} />
        )}

        <div className="mt-10">
          <Link href="/news"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium">
            ← Back to News
          </Link>
        </div>
      </div>
    </main>
  )
}