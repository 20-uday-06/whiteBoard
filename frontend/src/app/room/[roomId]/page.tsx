'use client'

import { useParams } from 'next/navigation'
import Whiteboard from '../../../components/Whiteboard'

export default function RoomPage() {
  const params = useParams()
  const roomId = params.roomId as string

  return <Whiteboard roomId={roomId} />
}
