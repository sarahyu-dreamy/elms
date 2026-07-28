import { PageHeader } from '@/components/ui'
import SpeakingForm from '../form'

export const metadata = { title: '스피킹 과제 등록' }

export default function NewSpeakingPage() {
  return (
    <>
      <PageHeader title="스피킹 과제 등록" />
      <SpeakingForm />
    </>
  )
}
