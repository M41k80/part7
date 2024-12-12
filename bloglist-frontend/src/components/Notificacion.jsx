import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearNotification } from '../store'

const Notificacion = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    if (notification.message) {
      const timeout = setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)

      return () => clearTimeout(timeout)
    }
  }, [notification, dispatch])

  if (!notification.message) return null

  const styles = {
    success: { backgroundColor: 'green', color: 'white' },
    error: { backgroundColor: 'red', color: 'white' }
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '10px 20px',
        borderRadius: '5px',
        zIndex: 9999,
        ...styles[notification.type]
      }}
    >
      {notification.message}
    </div>
  )
}

export default Notificacion
