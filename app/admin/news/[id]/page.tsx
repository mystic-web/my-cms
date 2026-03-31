import NewsEditor from '@/components/admin/NewsEditor'
export default function EditNewsPage({ params }: { params: { id: string } }) {
  return <NewsEditor newsId={params.id} />
}
