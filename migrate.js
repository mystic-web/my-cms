// migrate.js - MySQL to MongoDB Migration Script
// Run: node migrate.js

const fs = require('fs')
const mongoose = require('mongoose')
require('dotenv').config({ path: '.env.local' })

const SQL_FILE = 'C:/Users/Asus/Downloads/ggims.sql'

// ── SCHEMAS ──────────────────────────────────────────────────
const PhotoSchema = new mongoose.Schema({
  title: String, slug: String, description: String,
  images: [{ url: String, caption: String }],
  coverImage: String, album: { type: String, default: 'General' },
  tags: [String], status: { type: String, default: 'published' },
  publishedAt: Date, visits: Number,
}, { timestamps: true })

const BlogSchema = new mongoose.Schema({
  title: String, slug: String, content: String,
  excerpt: String, featuredImage: String, tags: [String],
  status: { type: String, default: 'published' },
  publishedAt: Date, visits: Number,
  seoTitle: String, seoDescription: String, seoKeywords: String,
}, { timestamps: true })

const NewsSchema = new mongoose.Schema({
  title: String, slug: String, content: String,
  excerpt: String, featuredImage: String, tags: [String],
  status: { type: String, default: 'published' },
  publishedAt: Date, visits: Number,
  seoTitle: String, seoDescription: String,
}, { timestamps: true })

const BranchSchema = new mongoose.Schema({
  name: String, address: String, phone: String,
  email: String, city: String, country: String,
  image: String, status: String,
}, { timestamps: true })

// ── HELPERS ───────────────────────────────────────────────────
function slugify(text) {
  if (!text) return `item-${Date.now()}-${Math.random().toString(36).slice(2,6)}`
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '')
    || `item-${Date.now()}`
}

function makeImageUrl(filename) {
  if (!filename) return ''
  if (filename.startsWith('http')) return filename
  return `https://ggims.in/admin/4/topics/${filename}`
}

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
    if (ch === ',') {
      values.push(current.trim() === 'NULL' ? null : current.trim())
      current = ''; i++; continue
    }
    current += ch; i++
  }
  values.push(current.trim() === 'NULL' ? null : current.trim())
  return values
}

function extractInserts(sql, tableName) {
  const rows = []
  const colRegex = new RegExp('INSERT INTO `' + tableName + '`\\s*\\(([^)]+)\\)\\s*VALUES', 'i')
  const colMatch = sql.match(colRegex)
  if (!colMatch) { console.log('  ⚠️  No INSERT found for: ' + tableName); return rows }
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

// ── MAIN ──────────────────────────────────────────────────────
async function migrate() {
  console.log('🚀 Starting migration...')
  console.log('📖 Reading SQL file...')
  const sql = fs.readFileSync(SQL_FILE, 'utf8')
  console.log('✅ SQL loaded! Size:', Math.round(sql.length/1024/1024) + 'MB')

  console.log('🔌 Connecting to MongoDB...')
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('✅ MongoDB connected!')

  const Photo = mongoose.model('Photo', PhotoSchema)
  const Blog = mongoose.model('Blog', BlogSchema)
  const News = mongoose.model('News', NewsSchema)
  const Branch = mongoose.model('Branch', BranchSchema)

  // ── TOPICS ────────────────────────────────────────────────
  console.log('\n📦 Reading topics...')
  const topicRows = extractInserts(sql, 'topics')
  console.log('Topics found:', topicRows.length)

  // ── PHOTOS (webmaster_id=4) ────────────────────────────────
  console.log('\n📸 Migrating Photos/Galleries...')
  const photoRows = extractInserts(sql, 'photos')
  const photosByTopic = {}
  photoRows.forEach(p => {
    if (!photosByTopic[p.topic_id]) photosByTopic[p.topic_id] = []
    photosByTopic[p.topic_id].push(p)
  })

  const galleryTopics = topicRows.filter(t => t.webmaster_id == '4' && t.title_en)
  console.log('Gallery topics found:', galleryTopics.length)

  let photoCount = 0
  const usedPhotoSlugs = new Set()
  for (const topic of galleryTopics) {
    const photos = photosByTopic[topic.id] || []
    const images = photos.map(p => ({
      url: makeImageUrl(p.file),
      caption: p.title || ''
    }))
    if (topic.photo_file && images.length === 0) {
      images.push({ url: makeImageUrl(topic.photo_file), caption: topic.title_en })
    }
    let slug = topic.seo_url_slug_en || slugify(topic.title_en)
    if (usedPhotoSlugs.has(slug)) slug = `${slug}-${topic.id}`
    usedPhotoSlugs.add(slug)
    await Photo.findOneAndUpdate({ slug }, {
      title: topic.title_en, slug, description: '',
      images, coverImage: images[0]?.url || makeImageUrl(topic.photo_file),
      album: 'General', tags: [],
      status: topic.status == '1' ? 'published' : 'draft',
      publishedAt: topic.status == '1' ? new Date(topic.created_at) : null,
      visits: parseInt(topic.visits) || 0,
    }, { upsert: true, new: true })
    photoCount++
  }
  console.log(`✅ ${photoCount} galleries migrated!`)

  // ── NEWS (webmaster_id=3) ──────────────────────────────────
  console.log('\n📰 Migrating News...')
  const newsTopics = topicRows.filter(t => t.webmaster_id == '3' && t.title_en)
  console.log('News topics found:', newsTopics.length)

  let newsCount = 0
  const usedNewsSlugs = new Set()
  for (const topic of newsTopics) {
    let slug = topic.seo_url_slug_en || slugify(topic.title_en)
    if (usedNewsSlugs.has(slug)) slug = `${slug}-${topic.id}`
    usedNewsSlugs.add(slug)
    await News.findOneAndUpdate({ slug }, {
      title: topic.title_en, slug,
      content: topic.details_en || '',
      excerpt: topic.seo_description_en || '',
      featuredImage: makeImageUrl(topic.photo_file),
      tags: topic.seo_keywords_en ? topic.seo_keywords_en.split(',').map(t => t.trim()) : [],
      status: topic.status == '1' ? 'published' : 'draft',
      publishedAt: topic.status == '1' ? new Date(topic.created_at) : null,
      visits: parseInt(topic.visits) || 0,
      seoTitle: topic.seo_title_en || topic.title_en,
      seoDescription: topic.seo_description_en || '',
    }, { upsert: true, new: true })
    newsCount++
  }
  console.log(`✅ ${newsCount} news migrated!`)

  // ── BLOG (webmaster_id=7) ──────────────────────────────────
  console.log('\n📝 Migrating Blog Posts...')
  const blogTopics = topicRows.filter(t => t.webmaster_id == '7' && t.title_en && t.details_en)
  // Section ID → category slug
const sectionCategoryMap = {
  '20': 'visa-programs',
  '22': 'study',
  '23': 'uk-visa',
  '24': 'australia-visa',
  '25': 'germany-visa',
  '27': 'work',
  '28': 'immigration',
  '29': 'canada-immigration',
  '30': 'australia-immigration',
}
  console.log('Blog topics found:', blogTopics.length)

  let blogCount = 0
  const usedBlogSlugs = new Set()
  for (const topic of blogTopics) {
    let slug = topic.seo_url_slug_en || slugify(topic.title_en)
    if (usedBlogSlugs.has(slug)) slug = `${slug}-${topic.id}`
    usedBlogSlugs.add(slug)
    await Blog.findOneAndUpdate({ slug }, {
      title: topic.title_en, slug,
      content: topic.details_en || '',
      excerpt: topic.seo_description_en || '',
      featuredImage: makeImageUrl(topic.photo_file),
      tags: topic.seo_keywords_en ? topic.seo_keywords_en.split(',').map(t => t.trim()) : [],
      status: topic.status == '1' ? 'published' : 'draft',
      publishedAt: topic.status == '1' ? new Date(topic.created_at) : null,
      visits: parseInt(topic.visits) || 0,
      seoTitle: topic.seo_title_en || topic.title_en,
      seoDescription: topic.seo_description_en || '',
      seoKeywords: topic.seo_keywords_en || '',
      category: sectionCategoryMap[topic.section_id] || 'general',
    }, { upsert: true, new: true })
    blogCount++
  }
  console.log(`✅ ${blogCount} blog posts migrated!`)

  // ── BRANCHES ──────────────────────────────────────────────
  console.log('\n🏢 Migrating Branches...')
  const branchRows = extractInserts(sql, 'branches')
  console.log('Branches found:', branchRows.length)

  // Clear old branches first
  await Branch.deleteMany({})
  let branchCount = 0
  for (const b of branchRows) {
    const name = b.title || b.title_en || b.name || `Branch ${b.id || b.branchid}`
    await Branch.create({
      name,
      address: b.address || '',
      phone: b.phone || b.mobile || '',
      email: b.email || '',
      city: b.city || b.country || '',
      country: b.country || '',
      image: b.image ? makeImageUrl(b.image) : '',
      status: b.status == '1' ? 'active' : 'active',
    })
    branchCount++
  }
  console.log(`✅ ${branchCount} branches migrated!`)

  // ── SUMMARY ───────────────────────────────────────────────
  console.log('\n🎉 Migration complete!')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`📸 Galleries  : ${photoCount}`)
  console.log(`📰 News       : ${newsCount}`)
  console.log(`📝 Blog Posts : ${blogCount}`)
  console.log(`🏢 Branches   : ${branchCount}`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

  await mongoose.disconnect()
  process.exit(0)
}

migrate().catch(err => {
  console.error('❌ Migration failed:', err.message)
  console.error(err.stack)
  process.exit(1)
})