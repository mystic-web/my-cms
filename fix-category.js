const mongoose = require('mongoose')
const fs = require('fs')
require('dotenv').config({ path: '.env.local' })

const sql = fs.readFileSync('C:/Users/Asus/Downloads/ggims.sql', 'utf8')

const slugCategoryMap = {}
// Sirf clean URLs match karo
const urlRegex = /https?:\/\/(?:go-globalimmigration|ggims)\.com\/blog\/([a-z0-9\-]+)\/([a-z0-9\-]+)/gi
let m
while ((m = urlRegex.exec(sql)) !== null) {
  const cat = m[1].toLowerCase()
  const slug = m[2].toLowerCase()
  if (cat && slug && !cat.includes('/') && !slug.includes('/')) {
    slugCategoryMap[slug] = cat
  }
}
console.log('URL mappings found:', Object.keys(slugCategoryMap).length)
console.log('Sample:', Object.entries(slugCategoryMap).slice(0, 5))

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const blogs = await mongoose.connection.collection('blogs').find({}).toArray()
  let updated = 0, matched = 0
  for (const blog of blogs) {
    const category = slugCategoryMap[blog.slug]
    if (category) {
      await mongoose.connection.collection('blogs').updateOne(
        { _id: blog._id },
        { $set: { category } }
      )
      matched++
    }
    updated++
  }
  console.log('✅ Total:', updated, '| Matched with category:', matched)
  process.exit()
})