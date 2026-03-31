import StaffEditor from '@/components/admin/StaffEditor'
export default function EditStaffPage({ params }: { params: { id: string } }) {
  return <StaffEditor staffId={params.id} />
}
