import React from 'react'
import styles from './styles.module.css'
import { useApp } from 'context/AppContext'
import exportToXml from '../../utils/XmlExport'

export const ExportToXmlButton = () => {
  const { puzzleData } = useApp()

  const handleExportToXML = () => {
    exportToXml(puzzleData)
  }

  return (
    <button className={styles.exportButton} onClick={handleExportToXML}>
    Export to XML
    </button>
  )
}