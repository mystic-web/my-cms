import BranchEditor from '@/components/admin/BranchEditor'
export default function EditBranchPage({ params }: { params: { id: string } }) {
  return <BranchEditor branchId={params.id} />
}
