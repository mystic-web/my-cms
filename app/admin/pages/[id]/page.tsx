import PageEditor from '@/components/admin/PageEditor'

export default function EditPage({ params }: { params: { id: string } }) {
  return <PageEditor pageId={params.id} />
}
