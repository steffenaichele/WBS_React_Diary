import { DaySquare } from './DaySquare'
import { generateYearDays } from '../utils/dateUtils'

/**
 * Calendar-Komponente zeigt eine Jahresübersicht mit allen Tagen als Grid
 * @param {number} todayNumber - Die aktuelle Tagesnummer im Jahr
 * @param {function} dayHasEntry - Funktion zum Prüfen ob ein Tag einen Eintrag hat
 * @param {function} onDayClick - Callback wenn ein Tag angeklickt wird
 */
export const Calendar = ({ todayNumber, dayHasEntry, onDayClick }) => {
  const allDays = generateYearDays()

  return (
    <div className="grid grid-cols-[repeat(21,32px)]">
      {allDays.map((dayNumber) => (
        <DaySquare
          key={dayNumber}
          dayNumber={dayNumber}
          todayNumber={todayNumber}
          isToday={dayNumber === todayNumber}
          hasEntry={dayHasEntry(dayNumber)}
          onClick={() => onDayClick(dayNumber)}
        />
      ))}
    </div>
  )
}

export default Calendar