import FAQEditor from '@/components/admin/FAQEditor'
export default function EditFAQPage({ params }: { params: { id: string } }) {
  return <FAQEditor faqId={params.id} />
}
