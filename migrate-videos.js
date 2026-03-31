const mongoose = require('mongoose')
const fs = require('fs')
require('dotenv').config({ path: '.env.local' })

const SQL_FILE = 'C:/Users/Asus/Downloads/ggims.sql'

function parseValues(str) {
  const values = []
  let i = 0, current = '', inStr = false, escape = false
  while (i < str.length) {
    const ch = str[i]
    if (escape) { current += ch; escape = false; i++; continue }
    if (ch === '\\') { escape = true; i++; continue }
    if (ch === "'" && !inStr) { inStr = true; i++; continue }
    if (ch === "'" && inStr) { inStr = false; i++; continue }
    if (inStr) { current += ch; i++; continue }
    if (ch === ',') { values.push(current.trim() === 'NULL' ? null : current.trim()); current = ''; i++; continue }
    current += ch; i++
  }
  values.push(current.trim() === 'NULL' ? null : current.trim())
  return values
}

function extractInserts(sql, tableName) {
  const rows = []
  const colRegex = new RegExp('INSERT INTO `' + tableName + '`\\s*\\(([^)]+)\\)\\s*VALUES', 'i')
  const colMatch = sql.match(colRegex)
  if (!colMatch) { console.log('No INSERT found for:', tableName); return rows }
  const cols = colMatch[1].split(',').map(c => c.trim().replace(/`/g, ''))
  const valuesStart = sql.indexOf(colMatch[0]) + colMatch[0].length
  const nextCreate = sql.indexOf('\nCREATE TABLE', valuesStart)
  const blockEnd = nextCreate > valuesStart ? nextCreate : sql.length
  const valuesBlock = sql.substring(valuesStart, blockEnd)
  let depth = 0, inStr = false, escape = false, rowStart = -1
  for (let i = 0; i < valuesBlock.length; i++) {
    const ch = valuesBlock[i]
    if (escape) { escape = false; continue }
    if (ch === '\\') { escape = true; continue }
    if (ch === "'") { inStr = !inStr; continue }
    if (inStr) continue
    if (ch === '(' && depth === 0) { rowStart = i + 1; depth++ }
    else if (ch === '(') depth++
    else if (ch === ')') {
      depth--
      if (depth === 0 && rowStart >= 0) {
        const rowStr = valuesBlock.substring(rowStart, i)
        const values = parseValues(rowStr)
        if (values.length === cols.length) {
          const obj = {}
          cols.forEach((col, idx) => { obj[col] = values[idx] })
          rows.push(obj)
        }
        rowStart = -1
      }
    }
  }
  return rows
}

function slugify(text) {
  if (!text) return `video-${Date.now()}`
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '')
    || `video-${Date.now()}`
}

// Convert video_file to embed URL
function makeEmbedUrl(videoFile) {
  if (!videoFile) return ''
  // YouTube ID
  if (videoFile.includes('youtube.com') || videoFile.includes('youtu.be')) {
    return videoFile.includes('embed') ? videoFile : videoFile.replace('watch?v=', 'embed/')
  }
  // Direct YouTube ID (just the ID string)
  if (videoFile.match(/^[a-zA-Z0-9_-]{11}$/)) {
    return `https://www.youtube.com/embed/${videoFile}`
  }
  return videoFile
}

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  console.log('✅ MongoDB connected!')
  console.log('📖 Reading SQL...')
  const sql = fs.readFileSync(SQL_FILE, 'utf8')

  const topics = extractInserts(sql, 'topics')
  console.log('Topics found:', topics.length)

  // webmaster_id=5 = Videos (Frames in Motion)
  const videoTopics = topics.filter(t => t.webmaster_id == '5' && t.title_en)
  console.log('Video topics found:', videoTopics.length)

  // Show sample
  if (videoTopics.length > 0) {
    console.log('Sample video:', {
      title: videoTopics[0].title_en,
      video_file: videoTopics[0].video_file,
      photo_file: videoTopics[0].photo_file,
      section_id: videoTopics[0].section_id,
    })
  }

  const usedSlugs = new Set()
  let count = 0

  for (const topic of videoTopics) {
    let slug = topic.seo_url_slug_en || slugify(topic.title_en)
    slug = slug.toLowerCase().replace(/[^a-z0-9\-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    if (usedSlugs.has(slug)) slug = `${slug}-${topic.id}`
    usedSlugs.add(slug)

    const embedUrl = makeEmbedUrl(topic.video_file)
    const thumbnailImage = topic.photo_file ? `https://ggims.com/uploads/topics/${topic.photo_file}` : ''

    await mongoose.connection.collection('videos').findOneAndUpdate(
      { slug },
      {
        $set: {
          title: topic.title_en,
          slug,
          description: topic.details_en || '',
          videoUrl: topic.video_file || '',
          embedUrl,
          thumbnailImage,
          category: 'frames-in-motion',
          subcategory: '',
          duration: '',
          tags: topic.seo_keywords_en ? topic.seo_keywords_en.split(',').map(t => t.trim()) : [],
          status: topic.status == '1' ? 'published' : 'draft',
          publishedAt: topic.status == '1' ? new Date(topic.created_at) : null,
          visits: parseInt(topic.visits) || 0,
          updatedAt: new Date(),
        },
        $setOnInsert: { createdAt: new Date() }
      },
      { upsert: true }
    )
    count++
    console.log(`  ✓ ${topic.title_en} → /videos/frames-in-motion/${slug}`)
  }

  console.log(`\n🎉 ${count} videos migrated!`)
  process.exit()
}).catch(err => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})