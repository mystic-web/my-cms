'use client'

interface PageData {
  title: string
  content: string
  htmlCode: string
  cssCode: string
  jsCode: string
  featuredImage?: string
}

export default function PageRenderer({ page }: { page: PageData }) {
  // Agar htmlCode hai toh iframe mein render karo
  if (page.htmlCode) {
    const fullHTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title}</title>
  <style>${page.cssCode}</style>
</head>
<body>
  ${page.htmlCode}
  <script>${page.jsCode}</script>
</body>
</html>`

    return (
      <iframe
        srcDoc={fullHTML}
        style={{ width: '100%', height: '100vh', border: 'none', display: 'block' }}
        title={page.title}
      />
    )
  }

  // Normal content — live website jaisa design
  return (
    <main className="min-h-screen bg-white">
      {/* Blue Banner with Breadcrumb */}
      <div className="bg-blue-900 text-white py-12 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-90"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-3">{page.title}</h1>
          <p className="text-sm text-blue-200">
            <a href="/" className="hover:underline">Home</a>
            <span className="mx-2">/</span>
            <span>{page.title}</span>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Featured Image */}
          {page.featuredImage && (
            <img
              src={page.featuredImage}
              alt={page.title}
              className="w-full rounded-xl mb-8 object-cover max-h-[400px]"
            />
          )}

          {/* Page Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-5">{page.title}</h2>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed
              prose-headings:text-gray-800 prose-headings:font-bold
              prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg
              prose-a:text-blue-600 hover:prose-a:underline
              prose-img:rounded-lg prose-img:my-4 prose-img:mx-auto
              prose-ul:list-disc prose-ol:list-decimal
              prose-li:text-gray-700
              prose-table:border prose-td:border prose-td:px-4 prose-td:py-2
              prose-th:border prose-th:px-4 prose-th:py-2 prose-th:bg-blue-700 prose-th:text-white
              prose-strong:text-gray-800 prose-blockquote:border-blue-500"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 shrink-0 space-y-6">

          {/* Get Free Consultation Form */}
          <div className="bg-blue-600 rounded-xl p-5 text-white shadow-lg">
            <h3 className="font-bold text-xl mb-4">Get Free Consultation</h3>
            <div className="space-y-3">
              <input type="text" placeholder="Name *"
                className="w-full px-3 py-2 rounded text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300" />
              <input type="tel" placeholder="Phone *"
                className="w-full px-3 py-2 rounded text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300" />
              <input type="email" placeholder="Email *"
                className="w-full px-3 py-2 rounded text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300" />
              <input type="text" placeholder="Country of Origin *"
                className="w-full px-3 py-2 rounded text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300" />
              <select className="w-full px-3 py-2 rounded text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
                <option value="">Select Education</option>
                <option>10th</option>
                <option>12th</option>
                <option>Diploma</option>
                <option>Two or more certificate</option>
                <option>Graduation</option>
                <option>Master</option>
                <option>PhD</option>
              </select>
              <select className="w-full px-3 py-2 rounded text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
                <option value="">Select Experience</option>
                {[1,2,3,4,5,6,7,8,9].map(y => <option key={y}>{y} Years</option>)}
                <option>10+ Years</option>
              </select>
              <select className="w-full px-3 py-2 rounded text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
                <option value="">Visa Type</option>
                <option>Express Entry</option>
                <option>PNP</option>
                <option>PR Visa</option>
                <option>Study Visa</option>
                <option>Job Seeker Visa</option>
                <option>Business Investor Program</option>
                <option>Visitor Visa</option>
                <option>Others</option>
              </select>
              <select className="w-full px-3 py-2 rounded text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
                <option value="">Country to Immigrate *</option>
                <option>Canada</option>
                <option>Australia</option>
                <option>Germany</option>
                <option>UK</option>
                <option>United Arab Emirates</option>
                <option>Europe</option>
                <option>Others</option>
              </select>
              <button className="w-full bg-white text-blue-700 font-bold py-2.5 rounded hover:bg-gray-100 transition-colors text-sm">
                Submit
              </button>
            </div>
          </div>

          {/* Canada Immigration Links */}
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-bold text-gray-800 text-base mb-3 border-b pb-2">Canada Immigration</h3>
            <ul className="space-y-2">
              {[
                ['Canada Express Entry', '/canada-express-entry'],
                ['Canada PNP', '/canada-pnp'],
                ['Canada Super Visa', '/canada-super-visa'],
                ['CRS Calculator', '/crs-calculator'],
                ['Canada PR Benefits', '/canada-pr-benefits'],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="text-sm text-blue-600 hover:underline">• {label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Australia Immigration Links */}
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-bold text-gray-800 text-base mb-3 border-b pb-2">Australia Immigration</h3>
            <ul className="space-y-2">
              {[
                ['Australia PR Visa', '/australia-pr-visa'],
                ['Australia Tourist Visa', '/australia-tourist-visa'],
                ['Australia Spouse Visa', '/australia-spouse-visa'],
                ['Australia Work Permit', '/australia-work-permit'],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="text-sm text-blue-600 hover:underline">• {label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-bold text-gray-800 text-base mb-3 border-b pb-2">Important Links</h3>
            <ul className="space-y-2">
              {[
                ['Germany Opportunity Card', '/germany-opportunity-card'],
                ['Portugal Job Seeker Visa', '/portugal-job-seeker-visa'],
                ['Sweden Job Seeker Visa', '/sweden-job-seeker-visa'],
                ['Contact Us', '/contact'],
                ['Blog', '/blog'],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="text-sm text-blue-600 hover:underline">• {label}</a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </main>
  )
}