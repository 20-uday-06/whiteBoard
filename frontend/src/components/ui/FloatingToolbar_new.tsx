'use client'

import React from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { 
  Pen, 
  Square, 
  Circle, 
  Type, 
  Eraser, 
  Undo, 
  Redo, 
  Trash2, 
  Download,
  Palette,
  Minus
} from 'lucide-react'
import { cn } from '../../utils/cn'
import { Button } from './Button'
import { Tool } from '../../types'

interface FloatingToolbarProps {
  currentTool: Tool
  currentColor: string
  lineWidth: number
  onToolChange: (tool: Tool) => void
  onColorChange: (color: string) => void
  onLineWidthChange: (width: number) => void
  onUndo: () => void
  onRedo: () => void
  onClear: () => void
  onExport: () => void
}

const tools = [
  { id: 'pen' as Tool, icon: Pen, label: 'Pen' },
  { id: 'rectangle' as Tool, icon: Square, label: 'Rectangle' },
  { id: 'circle' as Tool, icon: Circle, label: 'Circle' },
  { id: 'line' as Tool, icon: Minus, label: 'Line' },
  { id: 'text' as Tool, icon: Type, label: 'Text' },
  { id: 'eraser' as Tool, icon: Eraser, label: 'Eraser' },
]

const colors = [
  '#000000', '#FF0000', '#00FF00', '#0000FF', 
  '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500',
  '#800080', '#FFC0CB', '#A52A2A', '#808080'
]

const lineWidths = [1, 2, 4, 6, 8, 12]

export const FloatingToolbar: React.FC<FloatingToolbarProps> = ({
  currentTool,
  currentColor,
  lineWidth,
  onToolChange,
  onColorChange,
  onLineWidthChange,
  onUndo,
  onRedo,
  onClear,
  onExport
}) => {
  const [showColorPicker, setShowColorPicker] = React.useState(false)
  const [showLineWidthPicker, setShowLineWidthPicker] = React.useState(false)
  const [showCustomColorPicker, setShowCustomColorPicker] = React.useState(false)
  const [colorPickerPosition, setColorPickerPosition] = React.useState({ x: 0, y: 0 })
  const [lineWidthPickerPosition, setLineWidthPickerPosition] = React.useState({ x: 0, y: 0 })

  // Refs for positioning
  const colorButtonRef = React.useRef<HTMLButtonElement>(null)
  const lineWidthButtonRef = React.useRef<HTMLButtonElement>(null)

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.dropdown-container')) {
        setShowColorPicker(false)
        setShowLineWidthPicker(false)
        setShowCustomColorPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="toolbar-main fixed top-4 left-4 z-[9999] max-w-[calc(100vw-32px)] overflow-x-auto scrollbar-hide"
      >
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-3 backdrop-blur-sm">
          <div className="flex items-center gap-3 min-w-max">
            {/* Drawing Tools */}
            <div className="flex items-center gap-1 bg-gray-50/80 rounded-xl p-1">
              {tools.map((tool) => {
                const IconComponent = tool.icon
                return (
                  <motion.button
                    key={tool.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onToolChange(tool.id)}
                    className={cn(
                      'p-2.5 rounded-lg transition-all duration-200 relative group min-w-[44px] min-h-[44px] flex items-center justify-center',
                      currentTool === tool.id
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100'
                    )}
                    title={tool.label}
                  >
                    <IconComponent size={18} />
                    {currentTool === tool.id && (
                      <motion.div
                        layoutId="activeTool"
                        className="absolute inset-0 bg-blue-500 rounded-lg -z-10"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Divider */}
            <div className="h-10 w-px bg-gray-300" />

            {/* Color Picker */}
            <div className="relative dropdown-container">
              <motion.button
                ref={colorButtonRef}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  setColorPickerPosition({ 
                    x: rect.left, 
                    y: rect.bottom + 8 
                  })
                  setShowColorPicker(!showColorPicker)
                  setShowLineWidthPicker(false)
                }}
                className="p-2.5 rounded-lg hover:bg-gray-100 flex flex-col items-center gap-1 min-w-[44px] min-h-[44px]"
                title="Color"
              >
                <Palette size={16} className="text-gray-600" />
                <div 
                  className="w-4 h-4 rounded-full border-2 border-gray-300 shadow-sm"
                  style={{ backgroundColor: currentColor }}
                />
              </motion.button>
            </div>

            {/* Line Width */}
            <div className="relative dropdown-container">
              <motion.button
                ref={lineWidthButtonRef}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  setLineWidthPickerPosition({ 
                    x: rect.left, 
                    y: rect.bottom + 8 
                  })
                  setShowLineWidthPicker(!showLineWidthPicker)
                  setShowColorPicker(false)
                }}
                className="p-2.5 rounded-lg hover:bg-gray-100 flex items-center justify-center min-w-[44px] min-h-[44px]"
                title="Line Width"
              >
                <div 
                  className="bg-gray-600 rounded-full shadow-sm"
                  style={{ 
                    width: `${Math.max(Math.min(lineWidth * 2, 20), 4)}px`, 
                    height: `${Math.max(Math.min(lineWidth * 2, 20), 4)}px` 
                  }}
                />
              </motion.button>
            </div>

            {/* Divider */}
            <div className="h-10 w-px bg-gray-300" />

            {/* Action Buttons */}
            <div className="flex items-center gap-1 bg-gray-50/80 rounded-xl p-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onUndo} 
                title="Undo"
                className="min-w-[44px] min-h-[44px] p-2.5 text-gray-600 hover:bg-gray-100"
              >
                <Undo size={18} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onRedo} 
                title="Redo"
                className="min-w-[44px] min-h-[44px] p-2.5 text-gray-600 hover:bg-gray-100"
              >
                <Redo size={18} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClear} 
                title="Clear Canvas"
                className="min-w-[44px] min-h-[44px] p-2.5 text-gray-600 hover:bg-gray-100"
              >
                <Trash2 size={18} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onExport} 
                title="Export"
                className="min-w-[44px] min-h-[44px] p-2.5 text-gray-600 hover:bg-gray-100"
              >
                <Download size={18} />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Color Picker Portal */}
      {showColorPicker && typeof window !== 'undefined' && createPortal(
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          className="toolbar-dropdown fixed bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-[99999] min-w-[200px] max-h-[400px] overflow-y-auto"
          style={{
            left: colorPickerPosition.x,
            top: colorPickerPosition.y,
          }}
        >
          {/* Preset Colors */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {colors.map((color) => (
              <motion.button
                key={color}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  onColorChange(color)
                  setShowColorPicker(false)
                }}
                className={cn(
                  'w-8 h-8 rounded-full border-2 transition-all shadow-sm',
                  currentColor === color 
                    ? 'border-blue-500 ring-2 ring-blue-200 scale-110' 
                    : 'border-gray-300 hover:border-gray-400'
                )}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          
          {/* Custom Color Picker Button */}
          <div className="border-t border-gray-200 pt-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCustomColorPicker(true)}
              className="w-full p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center justify-center gap-2"
            >
              <Palette size={14} />
              Custom Color
            </motion.button>
          </div>
          
          {/* Custom Color Picker */}
          {showCustomColorPicker && (
            <div className="mt-3 border-t border-gray-200 pt-3">
              <input
                type="color"
                value={currentColor}
                onChange={(e) => {
                  onColorChange(e.target.value)
                  setShowCustomColorPicker(false)
                  setShowColorPicker(false)
                }}
                className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
                title="Choose custom color"
              />
            </div>
          )}
        </motion.div>,
        document.body
      )}

      {/* Line Width Picker Portal */}
      {showLineWidthPicker && typeof window !== 'undefined' && createPortal(
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          className="toolbar-dropdown fixed bg-white rounded-xl shadow-2xl border border-gray-200 p-3 flex flex-col gap-2 z-[99999] min-w-[100px]"
          style={{
            left: lineWidthPickerPosition.x,
            top: lineWidthPickerPosition.y,
          }}
        >
          {lineWidths.map((width) => (
            <motion.button
              key={width}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onLineWidthChange(width)
                setShowLineWidthPicker(false)
              }}
              className={cn(
                'flex items-center justify-center p-3 rounded-lg transition-all min-h-[40px]',
                lineWidth === width 
                  ? 'bg-blue-100 border-2 border-blue-500' 
                  : 'hover:bg-gray-100 border-2 border-transparent'
              )}
            >
              <div 
                className="bg-gray-600 rounded-full"
                style={{ 
                  width: `${Math.max(width * 2, 4)}px`, 
                  height: `${Math.max(width * 2, 4)}px` 
                }}
              />
            </motion.button>
          ))}
        </motion.div>,
        document.body
      )}
    </>
  )
}
