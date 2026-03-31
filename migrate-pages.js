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
  if (!colMatch) return rows
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
  if (!text) return `page-${Date.now()}`
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '')
    || `page-${Date.now()}`
}

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  console.log('✅ MongoDB connected!')
  console.log('📖 Reading SQL...')
  const sql = fs.readFileSync(SQL_FILE, 'utf8')

  const topics = extractInserts(sql, 'topics')
  console.log('Topics found:', topics.length)

  // webmaster_id=1 = Site Pages
  const sitePages = topics.filter(t => t.webmaster_id == '1' && t.title_en)
  console.log('Site pages found:', sitePages.length)

  const usedSlugs = new Set()
  let count = 0

  for (const topic of sitePages) {
    let slug = topic.seo_url_slug_en || slugify(topic.title_en)
    slug = slug.toLowerCase().replace(/[^a-z0-9\-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    if (usedSlugs.has(slug)) slug = `${slug}-${topic.id}`
    usedSlugs.add(slug)

    await mongoose.connection.collection('pages').findOneAndUpdate(
      { slug },
      {
        $set: {
          title: topic.title_en,
          slug,
          content: topic.details_en || '',
          htmlCode: '',
          cssCode: '',
          jsCode: '',
          metaTitle: topic.seo_title_en || topic.title_en || '',
          metaDescription: topic.seo_description_en || '',
          featuredImage: topic.photo_file ? `https://ggims.com/uploads/topics/${topic.photo_file}` : '',
          status: topic.status == '1' ? 'published' : 'draft',
          updatedAt: new Date(),
        },
        $setOnInsert: { createdAt: new Date() }
      },
      { upsert: true }
    )
    count++
    console.log(`  ✓ ${topic.title_en} → /${slug} ${topic.photo_file ? '🖼' : ''}`)
  }

  console.log(`\n🎉 ${count} pages migrated!`)
  process.exit()
}).catch(err => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})