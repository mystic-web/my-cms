const mongoose = require('mongoose')
require('dotenv').config({ path: '.env.local' })

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const blogs = await mongoose.connection.collection('blogs').find({}).toArray()
  console.log('Total blogs:', blogs.length)

  const usedSlugs = new Set()
  let fixed = 0

  for (const blog of blogs) {
    let newSlug = (blog.slug || '').toLowerCase()
      .replace(/[^a-z0-9\-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    // Agar slug already use hua hai toh unique banao
    if (usedSlugs.has(newSlug)) {
      newSlug = `${newSlug}-${blog._id.toString().slice(-4)}`
    }
    usedSlugs.add(newSlug)

    await mongoose.connection.collection('blogs').updateOne(
      { _id: blog._id },
      { $set: { slug: newSlug } }
    )
    fixed++
  }

  console.log('Fixed:', fixed, 'blogs')
  process.exit()
})