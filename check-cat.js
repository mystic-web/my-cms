const mongoose = require('mongoose')
require('dotenv').config({ path: '.env.local' })
mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const b = await mongoose.connection.collection('blogs').find({}).limit(3).project({title:1,category:1,slug:1,seoTitle:1}).toArray()
  b.forEach(x => console.log('category:', x.category, '| seoTitle:', x.seoTitle, '| slug:', x.slug))
  process.exit()
})