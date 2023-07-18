const storage = (key) => {
  if (key == null || key === '') {
    throw new Error('Storage key must contain value')
  }

  const getItem = () => {
    const jsonData = localStorage.getItem(key)
    return JSON.parse(jsonData)
  }

  const saveItem = (data) => {
    const jsonData = JSON.stringify(data)
    localStorage.setItem(key, jsonData)
  }

  const clearStorage = () => {
    localStorage.removeItem(key)
  }

  return {
    getItem,
    saveItem,
    clearStorage,
  }
}

export default storage
