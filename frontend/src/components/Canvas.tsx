'use client'

import React, { forwardRef, useRef, useEffect, useImperativeHandle, useState } from 'react'
import { Tool, DrawingData, ShapeData, TextData } from '../types'

interface CanvasProps {
  socket: any
  currentTool: Tool
  currentColor: string
  lineWidth: number
  users: any[]
}

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  ({ socket, currentTool, currentColor, lineWidth, users }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const contextRef = useRef<CanvasRenderingContext2D | null>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [startPos, setStartPos] = useState({ x: 0, y: 0 })
    const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>([])

    useImperativeHandle(ref, () => canvasRef.current!, [])

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const context = canvas.getContext('2d')
      if (!context) return

      // Set canvas size
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      context.scale(window.devicePixelRatio, window.devicePixelRatio)

      // Set drawing context properties
      context.lineCap = 'round'
      context.lineJoin = 'round'
      context.imageSmoothingEnabled = true

      contextRef.current = context

      // Socket event listeners for collaborative drawing
      const handleDrawStart = (data: DrawingData & { userId: string }) => {
        if (data.userId !== socket.id) {
          contextRef.current?.beginPath()
          contextRef.current?.moveTo(data.x, data.y)
        }
      }

      const handleDrawing = (data: DrawingData & { userId: string }) => {
        if (data.userId !== socket.id && contextRef.current) {
          contextRef.current.globalCompositeOperation = 
            data.tool === 'eraser' ? 'destination-out' : 'source-over'
          contextRef.current.strokeStyle = data.color
          contextRef.current.lineWidth = data.lineWidth
          
          if (data.prevX !== undefined && data.prevY !== undefined) {
            contextRef.current.beginPath()
            contextRef.current.moveTo(data.prevX, data.prevY)
            contextRef.current.lineTo(data.x, data.y)
            contextRef.current.stroke()
          }
        }
      }

      const handleDrawEnd = () => {
        if (contextRef.current) {
          contextRef.current.globalCompositeOperation = 'source-over'
        }
      }

      const handleShapeCreated = (data: ShapeData & { userId: string }) => {
        if (data.userId !== socket.id && contextRef.current) {
          drawShape(data)
        }
      }

      const handleTextCreated = (data: TextData & { userId: string }) => {
        if (data.userId !== socket.id && contextRef.current) {
          drawText(data)
        }
      }

      const handleCanvasCleared = () => {
        clearCanvas()
      }

      socket.on('draw-start', handleDrawStart)
      socket.on('drawing', handleDrawing)
      socket.on('draw-end', handleDrawEnd)
      socket.on('shape-created', handleShapeCreated)
      socket.on('text-created', handleTextCreated)
      socket.on('canvas-cleared', handleCanvasCleared)

      return () => {
        socket.off('draw-start', handleDrawStart)
        socket.off('drawing', handleDrawing)
        socket.off('draw-end', handleDrawEnd)
        socket.off('shape-created', handleShapeCreated)
        socket.off('text-created', handleTextCreated)
        socket.off('canvas-cleared', handleCanvasCleared)
      }
    }, [socket])

    const getMousePos = (e: React.MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return { x: 0, y: 0 }

      const rect = canvas.getBoundingClientRect()
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    const drawShape = (shapeData: ShapeData) => {
      const context = contextRef.current
      if (!context) return

      context.strokeStyle = shapeData.color
      context.lineWidth = shapeData.lineWidth
      context.beginPath()

      if (shapeData.type === 'rectangle') {
        context.rect(shapeData.x, shapeData.y, shapeData.width, shapeData.height)
      } else if (shapeData.type === 'circle') {
        const centerX = shapeData.x + shapeData.width / 2
        const centerY = shapeData.y + shapeData.height / 2
        const radius = Math.min(Math.abs(shapeData.width), Math.abs(shapeData.height)) / 2
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      }

      context.stroke()
    }

    const drawText = (textData: TextData) => {
      const context = contextRef.current
      if (!context) return

      context.fillStyle = textData.color
      context.font = `${textData.fontSize}px ${textData.fontFamily}`
      context.fillText(textData.text, textData.x, textData.y)
    }

    const clearCanvas = () => {
      const canvas = canvasRef.current
      const context = contextRef.current
      if (!canvas || !context) return

      context.clearRect(0, 0, canvas.width, canvas.height)
    }

    const handleMouseDown = (e: React.MouseEvent) => {
      const pos = getMousePos(e)
      setStartPos(pos)
      setIsDrawing(true)
      setCurrentPath([pos])

      if (currentTool === 'pen' || currentTool === 'eraser') {
        const context = contextRef.current
        if (context) {
          context.globalCompositeOperation = 
            currentTool === 'eraser' ? 'destination-out' : 'source-over'
          context.strokeStyle = currentColor
          context.lineWidth = lineWidth
          context.beginPath()
          context.moveTo(pos.x, pos.y)
        }

        socket.emit('draw-start', {
          x: pos.x,
          y: pos.y,
          color: currentColor,
          lineWidth,
          tool: currentTool
        })
      }
    }

    const handleMouseMove = (e: React.MouseEvent) => {
      const pos = getMousePos(e)

      // Send cursor position for collaborative cursor
      socket.emit('cursor-move', { x: pos.x, y: pos.y })

      if (!isDrawing) return

      if (currentTool === 'pen' || currentTool === 'eraser') {
        const context = contextRef.current
        if (context && currentPath.length > 0) {
          const prevPos = currentPath[currentPath.length - 1]
          
          context.lineTo(pos.x, pos.y)
          context.stroke()

          socket.emit('drawing', {
            x: pos.x,
            y: pos.y,
            prevX: prevPos.x,
            prevY: prevPos.y,
            color: currentColor,
            lineWidth,
            tool: currentTool
          })

          setCurrentPath(prev => [...prev, pos])
        }
      }
    }

    const handleMouseUp = (e: React.MouseEvent) => {
      if (!isDrawing) return

      setIsDrawing(false)
      const pos = getMousePos(e)

      if (currentTool === 'pen' || currentTool === 'eraser') {
        const context = contextRef.current
        if (context) {
          context.globalCompositeOperation = 'source-over'
        }

        socket.emit('draw-end', {
          path: currentPath,
          color: currentColor,
          lineWidth,
          tool: currentTool
        })
      } else if (currentTool === 'rectangle' || currentTool === 'circle') {
        const shapeData: ShapeData = {
          type: currentTool,
          x: Math.min(startPos.x, pos.x),
          y: Math.min(startPos.y, pos.y),
          width: Math.abs(pos.x - startPos.x),
          height: Math.abs(pos.y - startPos.y),
          color: currentColor,
          lineWidth
        }

        drawShape(shapeData)
        socket.emit('shape-created', shapeData)
      } else if (currentTool === 'text') {
        const text = prompt('Enter text:')
        if (text) {
          const textData: TextData = {
            x: pos.x,
            y: pos.y,
            text,
            color: currentColor,
            fontSize: 16,
            fontFamily: 'Arial'
          }

          drawText(textData)
          socket.emit('text-created', textData)
        }
      }

      setCurrentPath([])
    }

    return (
      <div className="w-full h-full relative">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair bg-white"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => setIsDrawing(false)}
        />
        
        {/* User cursors */}
        {users.map((user) => (
          user.cursor && user.id !== socket.id && (
            <div
              key={user.id}
              className="absolute pointer-events-none z-10"
              style={{
                left: user.cursor.x,
                top: user.cursor.y,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div 
                className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
                style={{ backgroundColor: user.color }}
              />
              <div className="absolute top-5 left-0 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {user.name}
              </div>
            </div>
          )
        ))}
      </div>
    )
  }
)

Canvas.displayName = 'Canvas'

export default Canvas
