import { useState } from 'react'

const useNotification = (timeout = 5000) => {
  const [notification, setNotification] = useState(null)
  const [timeoutId, setTimeoutId] = useState()

  const clearNotification = () => {
    setNotification(null)
  }

  const updateNotification = (newNotification) => {
    clearTimeout(timeoutId)
    setNotification(newNotification)
    const newTimeoutId = setTimeout(clearNotification, timeout)
    setTimeoutId(newTimeoutId)
  }

  return [notification, updateNotification, clearNotification]
}

export default useNotification;
