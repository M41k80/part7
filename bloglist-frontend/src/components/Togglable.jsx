import { useState } from 'react'

const Togglable = ({ buttonText, children }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <button onClick={toggleVisibility}>
        {visible ? 'Cancel' : buttonText}
      </button>
      {visible && (
        <div>
          {children}
        </div>
      )}
    </div>
  )
}

export default Togglable
