'use client'

import React, { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { Tool } from '../types'

interface ToolbarProps {
  currentTool: Tool
  currentColor: string
  lineWidth: number
  onToolChange: (tool: Tool) => void
  onColorChange: (color: string) => void
  onLineWidthChange: (width: number) => void
  onUndo: () => void
  onClearCanvas: () => void
  onExportCanvas: () => void
}

const Toolbar: React.FC<ToolbarProps> = ({
  currentTool,
  currentColor,
  lineWidth,
  onToolChange,
  onColorChange,
  onLineWidthChange,
  onUndo,
  onClearCanvas,
  onExportCanvas
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false)

  const tools = [
    { id: 'pen' as Tool, name: 'Pen', icon: '✏️' },
    { id: 'eraser' as Tool, name: 'Eraser', icon: '🧽' },
    { id: 'rectangle' as Tool, name: 'Rectangle', icon: '⬜' },
    { id: 'circle' as Tool, name: 'Circle', icon: '⭕' },
    { id: 'text' as Tool, name: 'Text', icon: '📝' }
  ]

  return (
    <div className="flex flex-col gap-4 w-64">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Tools</h3>
        <div className="grid grid-cols-2 gap-2">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => onToolChange(tool.id)}
              className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                currentTool === tool.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg">{tool.icon}</span>
                <span>{tool.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
        <div className="relative">
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="w-full h-12 rounded-lg border-2 border-gray-200 shadow-sm"
            style={{ backgroundColor: currentColor }}
          />
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-2 z-10 bg-white p-3 rounded-lg shadow-lg border border-gray-200">
              <HexColorPicker color={currentColor} onChange={onColorChange} />
              <button
                onClick={() => setShowColorPicker(false)}
                className="w-full mt-3 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Brush Size</h3>
        <div className="space-y-3">
          <input
            type="range"
            min="1"
            max="20"
            value={lineWidth}
            onChange={(e) => onLineWidthChange(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-sm text-gray-600">
            {lineWidth}px
          </div>
          <div className="flex justify-center">
            <div
              className="rounded-full bg-gray-800"
              style={{
                width: `${Math.max(lineWidth, 4)}px`,
                height: `${Math.max(lineWidth, 4)}px`
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Actions</h3>
        <div className="space-y-2">
          <button
            onClick={onUndo}
            className="w-full px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            ↶ Undo
          </button>
          <button
            onClick={onClearCanvas}
            className="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            🗑️ Clear Canvas
          </button>
          <button
            onClick={onExportCanvas}
            className="w-full px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            💾 Export PNG
          </button>
        </div>
      </div>
    </div>
  )
}

export default Toolbar
