import { useParams } from 'react-router'

export function TeamDetailPage() {
  const { id } = useParams()
  return <div>TeamDetailPage {id}</div>
}
