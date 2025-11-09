import { useState, useEffect } from 'react'
import { DaySquare, Modal } from './components'

const App = () => {
  const [allEntries, setAllEntries] = useState({})
  const [clickedDay, setClickedDay] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const savedData = localStorage.getItem('diary-entries')
    if (savedData) {
      const parsed = JSON.parse(savedData)
      setAllEntries(parsed)
    }
  }, [])

  const getToday = () => {
    const now = new Date()
    const startOfYear = new Date(now.getFullYear(), 0, 0)
    const difference = now.getTime() - startOfYear.getTime()
    const oneDay = 1000 * 60 * 60 * 24
    const dayNumber = Math.floor(difference / oneDay)
    return dayNumber
  }

  const today = getToday()

  const convertDayToDate = (dayNumber) => {
    const year = new Date().getFullYear()
    const date = new Date(year, 0, dayNumber)
    const formatted = date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    return formatted
  }

  const handleDayClick = (dayNumber) => {
    setClickedDay(dayNumber)
    setIsModalOpen(true)
  }

  const handleSaveEntry = (text) => {
    if (clickedDay === null) {
      return
    }

    const dayKey = clickedDay.toString()
    const dateString = convertDayToDate(clickedDay)
    const updatedEntries = { ...allEntries }

    if (text.trim() === '') {
      delete updatedEntries[dayKey]
    } else {
      updatedEntries[dayKey] = {
        date: dateString,
        content: text
      }
    }

    setAllEntries(updatedEntries)

    const jsonString = JSON.stringify(updatedEntries)
    localStorage.setItem('diary-entries', jsonString)
  }

  const allDays = []
  for (let i = 1; i <= 365; i++) {
    allDays.push(i)
  }

  const dayHasEntry = (dayNumber) => {
    const dayKey = dayNumber.toString()
    return allEntries[dayKey] !== undefined
  }

  const getEntryText = (dayNumber) => {
    const dayKey = dayNumber.toString()
    const entry = allEntries[dayKey]
    if (entry) {
      return entry.content
    }
    return ''
  }

  return (
		<div className="min-h-screen flex justify-center items-center bg-gray-200">
			<div className="grid grid-cols-[repeat(21,32px)]">
				{allDays.map((dayNumber) => (
					<DaySquare
						key={dayNumber}
						dayNumber={dayNumber}
						todayNumber={today}
						isToday={dayNumber === today}
						hasEntry={dayHasEntry(dayNumber)}
						onClick={() => handleDayClick(dayNumber)}
					/>
				))}
			</div>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				date={clickedDay ? convertDayToDate(clickedDay) : ""}
				initialContent={clickedDay ? getEntryText(clickedDay) : ""}
				onSave={handleSaveEntry}
			/>
		</div>
  )
}

export default App
