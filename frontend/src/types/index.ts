export interface DrawingData {
  x: number
  y: number
  prevX?: number
  prevY?: number
  color: string
  lineWidth: number
  tool: 'pen' | 'eraser'
}

export interface ShapeData {
  type: 'rectangle' | 'circle'
  x: number
  y: number
  width: number
  height: number
  color: string
  lineWidth: number
  fill?: boolean
}

export interface TextData {
  x: number
  y: number
  text: string
  color: string
  fontSize: number
  fontFamily: string
}

export interface User {
  id: string
  name: string
  color: string
  cursor?: { x: number; y: number }
}

export interface ChatMessage {
  id: string
  userId: string
  username: string
  message: string
  timestamp: Date
}

export interface CanvasElement {
  id: string
  type: 'draw' | 'shape' | 'text'
  data: DrawingData | ShapeData | TextData
  userId: string
  timestamp: Date
}

export type Tool = 'pen' | 'eraser' | 'rectangle' | 'circle' | 'text'
