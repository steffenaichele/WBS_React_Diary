import { useState, useEffect } from 'react'

const Modal = (props) => {
  const [text, setText] = useState(props.initialContent)

  useEffect(() => {
    setText(props.initialContent)
  }, [props.initialContent])

  if (props.isOpen === false) {
    return null
  }

  const handleSave = () => {
    props.onSave(text)
    props.onClose()
  }

  const handleTextChange = (event) => {
    setText(event.target.value)
  }

  const handleOverlayClick = () => {
    props.onClose()
  }

  const handleModalClick = (event) => {
    event.stopPropagation()
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-2xl w-[90%] max-w-[600px] max-h-[80vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom-4 duration-300"
        onClick={handleModalClick}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">
            Tagebucheintrag - {props.date}
          </h2>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-800 text-3xl"
            onClick={props.onClose}
          >
            ×
          </button>
        </div>

        <textarea
          className="flex-1 m-6 p-4 border-2 border-gray-200 rounded-lg text-base resize-none min-h-[300px] focus:outline-none"
          value={text}
          onChange={handleTextChange}
          placeholder="Schreibe deinen Eintrag hier..."
          autoFocus
        />

        <div className="flex gap-3 p-6 border-t border-gray-200 justify-end">
          <button
            className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg font-semibold hover:bg-gray-200"
            onClick={props.onClose}
          >
            Abbrechen
          </button>
          <button
            className="px-6 py-3 bg-blue-800 text-white rounded-lg font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all"
            onClick={handleSave}
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
