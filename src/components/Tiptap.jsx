// Tiptap.tsx
import React, { useEffect, useRef, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Image from '@tiptap/extension-image'
import { MenuBar } from './Menubar'
import './styles.css'
import  Shape  from './Shape.jsx'
import Line from './Line.jsx'
// import ExportImport from './ExportImport'
import ExportToWord from './ExportToWord.jsx'
import ExportToPdf from './ExportToPdf.jsx'
import SaveLoadControls from './EditorStorageHandler.jsx'

// import { FlowChartNodeData } from '../extensions/FlowChartNodeData'


const Tiptap = () => {
  const savedJSON = localStorage.getItem('tiptap-doc')
    const [drawingShape, setDrawingShape] = useState(null)
  
  const editorRef = useRef(null)
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Underline,
      Strike,
      BulletList,
      OrderedList,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      Shape,
      Line,
   
   
    ],
    // content: `<p>Hello Tiptap!</p>`,
    content: savedJSON ? JSON.parse(savedJSON) : '<p>Hello Tiptap!</p>',
  })

  useEffect(() => {
  const container = document.getElementById('editor-page')
  if (!container || !drawingShape || !editor) return

  let startX = 0, startY = 0
  let preview = null

  const onMouseDown = (e) => {
    if (e.button !== 0) return // Only left click
    const rect = container.getBoundingClientRect()
    startX = e.clientX - rect.left
    startY = e.clientY - rect.top

    preview = document.createElement('div')
    preview.style.position = 'absolute'
    preview.style.border = '1px dashed black'
    preview.style.left = `${startX}px`
    preview.style.top = `${startY}px`
    preview.style.zIndex = 9999
    container.appendChild(preview)

    container.addEventListener('mousemove', onMouseMove)
    container.addEventListener('mouseup', onMouseUp)
  }

  const onMouseMove = (e) => {
    const rect = container.getBoundingClientRect()
    const currentX = e.clientX - rect.left
    const currentY = e.clientY - rect.top

    const width = Math.abs(currentX - startX)
    const height = Math.abs(currentY - startY)

    preview.style.width = `${width}px`
    preview.style.height = `${height}px`
    preview.style.left = `${Math.min(currentX, startX)}px`
    preview.style.top = `${Math.min(currentY, startY)}px`
  }

  const onMouseUp = (e) => {
    const rect = container.getBoundingClientRect()
    const endX = e.clientX - rect.left
    const endY = e.clientY - rect.top

    const x = Math.min(startX, endX)
    const y = Math.min(startY, endY)
    const width = Math.abs(endX - startX)
    const height = Math.abs(endY - startY)

    if (width > 10 && height > 10) {
     editor
  .chain()
  .focus()
  .insertShape(drawingShape, 'Shape', { x, y, width, height })
  .run()

    }

    if (preview) preview.remove()
    container.removeEventListener('mousemove', onMouseMove)
    container.removeEventListener('mouseup', onMouseUp)
    setDrawingShape(null)
  }

  container.addEventListener('mousedown', onMouseDown)

  return () => {
    container.removeEventListener('mousedown', onMouseDown)
  }
}, [drawingShape, editor])

  return (
    <div className="editor-viewport">
      <div className="editor-menu">
        <MenuBar editor={editor} onStartDrawing={setDrawingShape} />
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
           {editor && <ExportToPdf  />}
           {editor && <ExportToWord editor={editor} />}
           {editor && <SaveLoadControls editor={editor} />}
        </div>
        
      </div>

      <div id="editor-page" className="editor-page" ref={editorRef} style={{ position: 'relative' }}>

        <EditorContent
         editor={editor}
         
         />
      
      </div>
    </div>
  )
}

export default Tiptap
