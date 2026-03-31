import TestimonialEditor from '@/components/admin/TestimonialEditor'
export default function EditTestimonialPage({ params }: { params: { id: string } }) {
  return <TestimonialEditor testimonialId={params.id} />
}
