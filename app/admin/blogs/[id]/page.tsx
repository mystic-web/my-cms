import BlogEditor from '@/components/admin/BlogEditor'
export default function EditBlog({ params }: { params: { id: string } }) {
  return <BlogEditor blogId={params.id} />
}
