// Tiptap.tsx
import React from 'react'
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
import ExportImport from './ExportImport'

// import { FlowChartNodeData } from '../extensions/FlowChartNodeData'


const Tiptap = () => {
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
    content: `<p>Hello Tiptap!</p>`,
  })

  return (
    <div className="editor-viewport">
      <div className="editor-menu">
        <MenuBar editor={editor} />
          {editor && <ExportImport editor={editor} />}
      </div>

      <div id="editor-page" className="editor-page">
       
        <EditorContent
         editor={editor}
         
         />
      </div>
    </div>
  )
}

export default Tiptap
