import PhotoEditor from '@/components/admin/PhotoEditor'
export default function EditPhotoPage({ params }: { params: { id: string } }) {
  return <PhotoEditor photoId={params.id} />
}
