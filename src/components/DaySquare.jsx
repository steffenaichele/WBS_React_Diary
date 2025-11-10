const DaySquare = (props) => {
  const squareClasses = "w-8 h-8 flex items-center justify-center rounded cursor-pointer group"

  let dotClasses = "w-2 h-2 rounded-full transition-all duration-200 "

  if (props.isToday || props.hasEntry) {
    dotClasses += "bg-gray-700 group-hover:bg-gray-700"
  } else if (props.dayNumber < props.todayNumber) {
    dotClasses += "bg-gray-400 group-hover:bg-gray-700"
  } else {
    dotClasses += "bg-gray-300 group-hover:bg-gray-700"
  }

  return (
    <div
      className={squareClasses}
      onClick={props.onClick}
      title={`Tag ${props.dayNumber}`}
    >
      <div className={dotClasses} />
    </div>
  )
}

export default DaySquare
