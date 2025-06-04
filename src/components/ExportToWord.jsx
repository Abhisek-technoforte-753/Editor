// ExportToWord.jsx
import React from 'react'
import htmlDocx from 'html-docx-js/dist/html-docx'

const ExportToWord = ({ editor }) => {
  const exportWord = () => {
    const html = document.getElementById('editor-page').innerHTML
    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial; }
            .shape-drag-handle { position: absolute; }
          </style>
        </head>
        <body>${html}</body>
      </html>
    `
    const blob = htmlDocx.asBlob(content)
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'document.docx'
    link.click()
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      <button onClick={exportWord}>Export to Word</button>
    </div>
  )
}

export default ExportToWord
