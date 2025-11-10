import { useState } from 'react'
import Modal from './components/Modal'
import Calendar from './components/Calendar'
import { useDiaryEntries } from './hooks/useDiaryEntries'
import { getToday, convertDayToDate } from './utils/dateUtils'

const App = () => {
  const [clickedDay, setClickedDay] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { dayHasEntry, getEntryText, saveEntry } = useDiaryEntries()
  const today = getToday()

  const handleDayClick = (dayNumber) => {
    setClickedDay(dayNumber)
    setIsModalOpen(true)
  }

  const handleSaveEntry = (text) => {
    saveEntry(clickedDay, text)
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      <Calendar
        todayNumber={today}
        dayHasEntry={dayHasEntry}
        onDayClick={handleDayClick}
      />

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
