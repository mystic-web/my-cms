import PartnerEditor from '@/components/admin/PartnerEditor'
export default function EditPartnerPage({ params }: { params: { id: string } }) {
  return <PartnerEditor partnerId={params.id} />
}
