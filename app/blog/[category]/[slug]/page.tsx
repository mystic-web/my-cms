import { notFound } from 'next/navigation'
import Link from 'next/link'
import connectDB from '@/lib/mongodb'
import Blog from '@/models/Blog'

export async function generateMetadata({ params }: { params: { category: string; slug: string } }) {
  await connectDB()
  const blog = await Blog.findOne({ slug: params.slug, status: 'published' })
  if (!blog) return {}
  return {
    title: blog.seoTitle || blog.title + ' - GGIMS',
    description: blog.seoDescription || blog.excerpt || '',
    keywords: blog.seoKeywords || '',
  }
}

export default async function BlogPost({ params }: { params: { category: string; slug: string } }) {
  await connectDB()
  const blog = await Blog.findOne({ slug: params.slug, status: 'published' })
  if (!blog) notFound()

  const related = await Blog.find({
    status: 'published',
    category: blog.category,
    _id: { $ne: blog._id }
  }).sort({ publishedAt: -1 }).limit(3).lean()

  const mostViewed = await Blog.find({ status: 'published', _id: { $ne: blog._id } })
    .sort({ visits: -1 }).limit(3).lean()

  const date = blog.publishedAt || blog.createdAt
  const formattedDate = date ? new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  }) : ''

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb Banner */}
      <div className="bg-blue-900 text-white py-10 px-4 text-center">
        <h1 className="text-2xl font-bold mb-2">{blog.category || 'Blog'}</h1>
        <p className="text-sm text-blue-200">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:underline">Blog</Link>
          <span className="mx-2">/</span>
          <span>{blog.category || 'Post'}</span>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {blog.featuredImage && (
            <img src={blog.featuredImage} alt={blog.title}
              className="w-full rounded-xl mb-6 object-cover max-h-[450px]" />
          )}
          {blog.category && (
            <div className="mb-3">
              <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full">
                {blog.category}
              </span>
            </div>
          )}
          <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-snug">{blog.title}</h1>
          <p className="text-gray-400 text-sm mb-6">
            By {blog.author || 'Admin'} • {formattedDate}
          </p>
          {blog.excerpt && (
            <p className="text-lg text-gray-600 border-l-4 border-orange-500 pl-4 mb-6 italic">
              {blog.excerpt}
            </p>
          )}
          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed
              prose-headings:text-gray-800 prose-headings:font-bold
              prose-h2:text-2xl prose-h3:text-xl
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-lg prose-img:my-4
              prose-table:border prose-td:border prose-td:px-3 prose-td:py-2
              prose-th:border prose-th:px-3 prose-th:py-2 prose-th:bg-blue-700 prose-th:text-white"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          {blog.tags?.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-2">
              {blog.tags.map((tag: string) => (
                <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <div className="mt-8">
            <Link href="/blog" className="text-blue-600 hover:underline text-sm">
              ← Back to Blog
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 shrink-0 space-y-6">
          <div className="bg-blue-600 rounded-xl p-5 text-white">
            <h3 className="font-bold text-xl mb-4">Get Free Consultation</h3>
            <div className="space-y-3">
              {['Name *', 'Phone *', 'Email *', 'Country of Origin *'].map(field => (
                <input key={field} type="text" placeholder={field}
                  className="w-full px-3 py-2 rounded text-gray-800 text-sm placeholder-gray-400 focus:outline-none" />
              ))}
              <select className="w-full px-3 py-2 rounded text-gray-800 text-sm focus:outline-none">
                <option>Select Education</option>
                <option>10th</option><option>12th</option><option>Diploma</option>
                <option>Graduation</option><option>Master</option><option>PhD</option>
              </select>
              <select className="w-full px-3 py-2 rounded text-gray-800 text-sm focus:outline-none">
                <option>Select Experience</option>
                {[1,2,3,4,5,6,7,8,9].map(y => <option key={y}>{y} Years</option>)}
                <option>10+ Years</option>
              </select>
              <select className="w-full px-3 py-2 rounded text-gray-800 text-sm focus:outline-none">
                <option>Visa Type</option>
                <option>Express Entry</option><option>PNP</option><option>PR Visa</option>
                <option>Study Visa</option><option>Job Seeker Visa</option><option>Visitor Visa</option>
              </select>
              <select className="w-full px-3 py-2 rounded text-gray-800 text-sm focus:outline-none">
                <option>Country to Immigrate *</option>
                <option>Canada</option><option>Australia</option><option>Germany</option>
                <option>UK</option><option>UAE</option><option>Europe</option><option>Others</option>
              </select>
              <button className="w-full bg-white text-blue-700 font-bold py-2 rounded hover:bg-gray-100 transition-colors">
                Submit
              </button>
            </div>
          </div>

          {mostViewed.length > 0 && (
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="font-bold text-gray-800 text-lg mb-4 border-b pb-2">Most Viewed</h3>
              <div className="space-y-4">
                {mostViewed.map((b: any) => (
                  <Link key={b._id.toString()} href={`/blog/${b.category || 'general'}/${b.slug}`}
                    className="flex gap-3 hover:opacity-80 transition-opacity">
                    {b.featuredImage && (
                      <img src={b.featuredImage} alt={b.title}
                        className="w-16 h-14 object-cover rounded shrink-0" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-700 line-clamp-2">{b.title}</p>
                      {b.excerpt && (
                        <p className="text-xs text-gray-400 line-clamp-1 mt-1">{b.excerpt}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {related.length > 0 && (
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="font-bold text-gray-800 text-lg mb-4 border-b pb-2">Related Posts</h3>
              <div className="space-y-3">
                {related.map((b: any) => (
                  <Link key={b._id.toString()} href={`/blog/${b.category || 'general'}/${b.slug}`}
                    className="block text-sm text-blue-600 hover:underline line-clamp-2">
                    {b.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}