import Link from 'next/link'
import connectDB from '@/lib/mongodb'
import Blog from '@/models/Blog'

export const metadata = { title: 'Blog - GGIMS', description: 'Latest blog posts from Go Global Immigration Services' }

const POSTS_PER_PAGE = 30

export default async function BlogPage({ searchParams }: { searchParams: { page?: string; category?: string } }) {
  await connectDB()

  const page = parseInt(searchParams.page || '1')
  const category = searchParams.category || ''
  const skip = (page - 1) * POSTS_PER_PAGE

  const query: any = { status: 'published' }
  if (category) query.category = category

  const [blogs, total] = await Promise.all([
    Blog.find(query).sort({ publishedAt: -1 }).skip(skip).limit(POSTS_PER_PAGE).lean(),
    Blog.countDocuments(query),
  ])

  const totalPages = Math.ceil(total / POSTS_PER_PAGE)

  const categoryAgg = await Blog.aggregate([
    { $match: { status: 'published' } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ])

  const mostViewed = await Blog.find({ status: 'published' }).sort({ visits: -1 }).limit(3).lean()

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">

        {/* Main Grid */}
        <div className="flex-1">
          {blogs.length === 0 ? (
            <p className="text-gray-500">No blog posts found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {blogs.map((blog: any) => (
                <div key={blog._id.toString()} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow border border-gray-100">
                  <Link href={`/blog/${blog.category || 'general'}/${blog.slug}`}>
                    <div className="overflow-hidden h-52 bg-gray-100">
                      {blog.featuredImage ? (
                        <img src={blog.featuredImage} alt={blog.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/blog/${blog.category || 'general'}/${blog.slug}`}>
                      <h2 className="font-bold text-gray-800 text-base hover:text-blue-700 transition-colors mb-2 line-clamp-2">
                        {blog.title}
                      </h2>
                    </Link>
                    {blog.excerpt && (
                      <p className="text-gray-500 text-sm line-clamp-3 mb-3">{blog.excerpt}</p>
                    )}
                    <Link href={`/blog/${blog.category || 'general'}/${blog.slug}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      ... More Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2 mt-8 flex-wrap">
              {page > 1 && (
                <Link href={`/blog?page=${page - 1}${category ? `&category=${category}` : ''}`}
                  className="px-3 py-1.5 border rounded text-sm hover:bg-gray-100">‹</Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <Link key={p} href={`/blog?page=${p}${category ? `&category=${category}` : ''}`}
                  className={`px-3 py-1.5 border rounded text-sm ${p === page ? 'bg-blue-700 text-white border-blue-700' : 'hover:bg-gray-100'}`}>
                  {p}
                </Link>
              ))}
              {page < totalPages && (
                <Link href={`/blog?page=${page + 1}${category ? `&category=${category}` : ''}`}
                  className="px-3 py-1.5 border rounded text-sm hover:bg-gray-100">›</Link>
              )}
            </div>
          )}
          <p className="text-sm text-gray-400 mt-3">
            {skip + 1} - {Math.min(skip + POSTS_PER_PAGE, total)} of ({total}) records
          </p>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
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

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-bold text-gray-800 text-lg mb-4 border-b pb-2">Categories</h3>
            <ul className="space-y-2">
              {categoryAgg.map((cat: any) => (
                <li key={cat._id}>
                  <Link href={`/blog?category=${encodeURIComponent(cat._id)}`}
                    className={`flex justify-between items-center text-sm hover:text-blue-700 transition-colors py-1 ${category === cat._id ? 'text-blue-700 font-semibold' : 'text-gray-600'}`}>
                    <span>{cat._id || 'General'}</span>
                    {cat.count > 0 && <span className="text-gray-400 text-xs">{cat.count}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {mostViewed.length > 0 && (
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="font-bold text-gray-800 text-lg mb-4 border-b pb-2">Most Viewed</h3>
              <div className="space-y-4">
                {mostViewed.map((blog: any) => (
                  <Link key={blog._id.toString()} href={`/blog/${blog.category || 'general'}/${blog.slug}`}
                    className="flex gap-3 hover:opacity-80 transition-opacity">
                    {blog.featuredImage && (
                      <img src={blog.featuredImage} alt={blog.title}
                        className="w-16 h-14 object-cover rounded shrink-0" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-700 line-clamp-2">{blog.title}</p>
                      {blog.excerpt && (
                        <p className="text-xs text-gray-400 line-clamp-1 mt-1">{blog.excerpt}</p>
                      )}
                    </div>
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