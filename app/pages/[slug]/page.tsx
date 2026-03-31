import { notFound } from 'next/navigation'
import connectDB from '@/lib/mongodb'
import Page from '@/models/Page'
import PageRenderer from './PageRenderer'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  await connectDB()
  const page = await Page.findOne({ slug: params.slug, status: 'published' })
  if (!page) return {}
  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || '',
  }
}

export default async function PublicPage({ params }: { params: { slug: string } }) {
  await connectDB()
  const page = await Page.findOne({ slug: params.slug, status: 'published' })

  if (!page) notFound()

  const pageData = {
    title: page.title,
    content: page.content || '',
    htmlCode: page.htmlCode || '',
    cssCode: page.cssCode || '',
    jsCode: page.jsCode || '',
  }

  return <PageRenderer page={pageData} />
}
