const mongoose = require('mongoose')
require('dotenv').config({ path: '.env.local' })
mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const blogs = await mongoose.connection.collection('blogs').find({}).limit(3).toArray()
  blogs.forEach(b => console.log(b.title, '|', b.featuredImage))
  process.exit(0)
})
