import { useEffect, useState } from 'react';
import './Questions.css'

const Questions = ({
  template,
  updateTemplate
}) => {
  const [topcis, setTopics] = useState([])
  const [topic, setTopic] = useState('')
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    setTopics(Object.keys(template))
  }, [template])


  useEffect(() => {
    setQuestions(template[topic]?.questions ?? [])
  }, [topic, template])

  const onAddQuestion = ({ title, answers = [] }) => {
    const newQuestions = [...questions, { title, answers }]
    const oldTopic = template[topic]
    const newTopic = { ...oldTopic, questions: newQuestions }
    const newTemplate = { ...template, [topic]: newTopic }
    updateTemplate(newTemplate)
  }

  return (
    <div className='questions-page-container'>
      <h1>Modify Questions</h1>
      <SelectTopics topics={topcis} topic={topic} setTopic={setTopic} />
      {topic === '' ? null : <ShowQuestions topic={topic} onAddQuestion={onAddQuestion} questions={questions} />}
    </div>
  )
}

const ShowQuestions = ({
  topic,
  questions,
  onAddQuestion
}) => {
  return (
    <div className='show-questions'>
      <h3>{topic.toUpperCase()}</h3>
      <div className='questions-container'>
        {questions.map(Question)}
      </div>
      <NewQuestion onAddQuestion={onAddQuestion} />
    </div>
  )
}

const SelectTopics = ({ topics, topic, setTopic }) => {
  return (
    <div className='topics-container'>
      <label htmlFor="topics">Modify topic: </label>
      <select id='topics' value={topic} onChange={(e) => setTopic(e.target.value)}>
        <option key='empty' value=''>Choose topic</option>
        {topics.map((topicValue) => (
          <option
            key={topicValue}
            id={topicValue}
            value={topicValue}
          >
            {topicValue.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  )
}

const Question = ({ title, answers = {} }) => {
  return (
    <div key={title} className='question-container'>
      <h5>{title}</h5>
      <div className='answers-container'>
        {answers.map(QuestionAnswer)}
      </div>
    </div>
  )
}

const QuestionAnswer = ({ choice, isCorrect }) => {
  return (
    <div className='answer-container'>
      <p>{choice}</p>
      <p>{isCorrect ? 'true' : 'false'}</p>
    </div>
  )
}

const NewQuestion = ({ onAddQuestion }) => {
  const [questionTitle, setQuestionTitle] = useState('')

  const handleValueChange = (event) => {
    setQuestionTitle(event.target.value)
  }

  const onSubmit = () => {
    if (questionTitle.trim() !== '') {
      onAddQuestion({ title: questionTitle })
    }
    setQuestionTitle('')
  }

  return (
    <div className='new-question-container'>
      <label htmlFor='new-question-title'>Add new question: </label>
      <input
        id='new-question-title'
        value={questionTitle}
        onChange={handleValueChange}
      />
      <button onClick={onSubmit} type='submit'>Add</button>
    </div>
  )
}

export default Questions;
