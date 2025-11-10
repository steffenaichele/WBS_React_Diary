import { useState, useEffect } from 'react'
import { convertDayToDate } from '../utils/dateUtils'

/**
 * Custom Hook für die Verwaltung von Tagebuch-Einträgen
 * Verwaltet den State und die LocalStorage-Persistierung
 */
export const useDiaryEntries = () => {
  const [allEntries, setAllEntries] = useState({})

  // Lade Einträge aus LocalStorage beim ersten Render
  useEffect(() => {
    const savedData = localStorage.getItem('diary-entries')
    if (savedData) {
      const parsed = JSON.parse(savedData)
      setAllEntries(parsed)
    }
  }, [])

  /**
   * Prüft, ob ein bestimmter Tag einen Eintrag hat
   * @param {number} dayNumber - Die Tagesnummer im Jahr
   * @returns {boolean} True wenn ein Eintrag existiert
   */
  const dayHasEntry = (dayNumber) => {
    const dayKey = dayNumber.toString()
    return allEntries[dayKey] !== undefined
  }

  /**
   * Holt den Eintrag-Text für einen bestimmten Tag
   * @param {number} dayNumber - Die Tagesnummer im Jahr
   * @returns {string} Der Eintrag-Text oder ein leerer String
   */
  const getEntryText = (dayNumber) => {
    const dayKey = dayNumber.toString()
    const entry = allEntries[dayKey]
    return entry ? entry.content : ''
  }

  /**
   * Speichert oder löscht einen Eintrag für einen bestimmten Tag
   * @param {number} dayNumber - Die Tagesnummer im Jahr
   * @param {string} text - Der Eintrag-Text (leerer Text löscht den Eintrag)
   */
  const saveEntry = (dayNumber, text) => {
    if (dayNumber === null) {
      return
    }

    const dayKey = dayNumber.toString()
    const dateString = convertDayToDate(dayNumber)
    const updatedEntries = { ...allEntries }

    if (text.trim() === '') {
      // Leerer Text: Eintrag löschen
      delete updatedEntries[dayKey]
    } else {
      // Text vorhanden: Eintrag speichern
      updatedEntries[dayKey] = {
        date: dateString,
        content: text
      }
    }

    setAllEntries(updatedEntries)

    // Persistiere in LocalStorage
    const jsonString = JSON.stringify(updatedEntries)
    localStorage.setItem('diary-entries', jsonString)
  }

  return {
    allEntries,
    dayHasEntry,
    getEntryText,
    saveEntry
  }
}
