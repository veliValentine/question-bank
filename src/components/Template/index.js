import { useState } from 'react'
import './Template.css'

const Template = ({
  template,
  saveTemplate,
  notifyError,
}) => {
  const [text, setText] = useState(JSON.stringify(template))
  const onSubmit = () => {
    try {
      const template = JSON.parse(text);
      saveTemplate(template)
    } catch (error) {
      if (error instanceof SyntaxError) {
        notifyError(`Invalid JSON: ${error.message}`)
      }
    }
  }
  return (
    <div className='start-container'>
      <h1>Add Template</h1>
      <label htmlFor="template">Add topics as JSON with or without questions to get started</label>
      <textarea id="template" value={text} onChange={(e) => setText(e.target.value)} />
      <label htmlFor="submit">Submit when ready</label>
      <button id="submit" onClick={onSubmit}>Submit</button>
    </div>
  )
}

export default Template;
