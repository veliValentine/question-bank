import { useState } from 'react'

const Question = ({
  title,
  answers = [],
  submitAnswer
}) => {
  const [selected, setSelected] = useState()

  const onSubmit = () => submitAnswer(selected)

  const choices = answers.map(({ choice, isCorrect }) => (
    <div>
      <input
        type='radio'
        name={`${title}-choices`}
        id={`${title}-${choice}`}
        value={choice}
        onChange={() => setSelected(isCorrect)}
      />
      <label for={`${title}-${choice}`}>{choice}</label>
    </div>
  ))
  return (
    <div>
      <h4>{title}</h4>
      {choices}
      <button
        onClick={onSubmit}>
        Submit Answer
      </button>
    </div>
  )
}

export default Question
