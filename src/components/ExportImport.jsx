// ExportImport.jsx
import React from 'react'

const ExportImport = ({ editor }) => {
  const exportToFile = () => {
    const data = JSON.stringify(editor.getJSON(), null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'document.json'
    link.click()
  }

  const importFromFile = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const content = JSON.parse(reader.result)
      editor.commands.setContent(content)
    }
    reader.readAsText(file)
  }

  return (
    <div style={{ margin: '1rem 0' }}>
      <button onClick={exportToFile}>Export</button>
      <input type="file" accept="application/json" onChange={importFromFile} />
    </div>
  )
}

export default ExportImport
