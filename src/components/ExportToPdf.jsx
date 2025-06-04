import React from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const ExportToPdf = () => {
  const exportPDF = async () => {
    const input = document.getElementById('editor-page')
    if (!input) return

    // Capture as image
    const canvas = await html2canvas(input, {
      allowTaint: true,
      useCORS: true,
      scale: 2, // Higher scale = better quality
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const imgProps = pdf.getImageProperties(imgData)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save('editor-content.pdf')
  }

  return (
    <button onClick={exportPDF} style={{ marginTop: '1rem' }}>
      Export to PDF
    </button>
  )
}

export default ExportToPdf
