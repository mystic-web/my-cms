import VideoEditor from '@/components/admin/VideoEditor'
export default function EditVideoPage({ params }: { params: { id: string } }) {
  return <VideoEditor videoId={params.id} />
}
