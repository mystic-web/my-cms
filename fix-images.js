const mongoose = require('mongoose')
require('dotenv').config({ path: '.env.local' })

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  // Fix blogs - ggims.in → ggims.com
  const r1 = await mongoose.connection.collection('blogs').updateMany(
    { featuredImage: { $regex: 'ggims.in' } },
    [{ $set: { featuredImage: { $replaceAll: { input: '$featuredImage', find: 'https://ggims.in/admin/4/topics/', replacement: 'https://ggims.com/uploads/topics/' } } } }]
  )
  console.log('Blogs fixed:', r1.modifiedCount)

  // Fix news
  const r2 = await mongoose.connection.collection('news').updateMany(
    { coverImage: { $regex: 'ggims.in' } },
    [{ $set: { coverImage: { $replaceAll: { input: '$coverImage', find: 'https://ggims.in/admin/4/topics/', replacement: 'https://ggims.com/uploads/topics/' } } } }]
  )
  console.log('News fixed:', r2.modifiedCount)

  console.log('✅ Done!')
  process.exit()
})