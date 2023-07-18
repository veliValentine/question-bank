import { useEffect, useState } from 'react'
import storage from '../storage'

const templateStorage = storage('template')

const useTemplate = () => {
  const [template, setTemplate] = useState({})

  const readTemplateFromStorage = () => {
    const storedTemplate = templateStorage.getItem()
    if (storedTemplate == null) {
      return
    }
    setTemplate(storedTemplate)
  }

  useEffect(readTemplateFromStorage, [])

  const updateTemplate = (newTemplate) => {
    setTemplate(newTemplate)
    templateStorage.saveItem(newTemplate)
  }

  return [template, updateTemplate]
}

export default useTemplate;
