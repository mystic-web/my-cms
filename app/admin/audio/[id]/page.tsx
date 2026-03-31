import AudioEditor from '@/components/admin/AudioEditor'
export default function EditAudioPage({ params }: { params: { id: string } }) {
  return <AudioEditor audioId={params.id} />
}
