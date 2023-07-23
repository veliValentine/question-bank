import { useEffect, useState } from 'react';
import './Questions.css'

const Questions = ({
  template,
  updateTemplate
}) => {
  const [topics, setTopics] = useState([])
  const [topic, setTopic] = useState('')
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const topics = Object.keys(template)
    setTopics(topics)
    if (topics.length === 1) {
      setTopic(topics[0])
    }
  }, [template])


  useEffect(() => {
    setQuestions(template[topic]?.questions ?? [])
  }, [topic, template])

  const onAddQuestion = ({ title, answers = [] }) => {
    const newQuestions = [...questions, { title, answers }]
    updateTopicQuestions(newQuestions)
  }

  const onAddAnswer = ({ title, answer }) => {
    const oldQuestions = template[topic].questions
    const oldQuestion = oldQuestions.find(({ title: oldTitle }) => oldTitle === title)
    const newAnswers = oldQuestion.answers.concat(answer)
    const newQuestion = { ...oldQuestion, answers: newAnswers }
    const newQuestions = oldQuestions.map((question) => question.title === title ? newQuestion : question)
    updateTopicQuestions(newQuestions)
  }

  const updateTopicQuestions = (newQuestions) => {
    const newTopic = { ...template[topic], questions: newQuestions }
    const newTemplate = { ...template, [topic]: newTopic }
    updateTemplate(newTemplate)
  }

  return (
    <div className='questions-page-container'>
      <h1>Modify Questions</h1>
      <SelectTopics topics={topics} topic={topic} setTopic={setTopic} />
      {topic === ''
        ? null
        : (
          <ShowQuestions
            topic={topic}
            questions={questions}
            onAddQuestion={onAddQuestion}
            onAddAnswer={onAddAnswer}
          />)
      }
    </div>
  )
}

const ShowQuestions = ({
  topic,
  questions,
  onAddQuestion,
  onAddAnswer
}) => {
  return (
    <div className='show-questions'>
      <h3>{topic.toUpperCase()}</h3>
      <div className='questions-container'>
        {questions.map(({ title, answers }) => (
          <Question key={title}
            title={title}
            answers={answers}
            onAddAnswer={onAddAnswer}
          />
        ))}
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

const Question = ({ title, answers = {}, onAddAnswer }) => {
  const [newAnswer, setNewAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)

  const handleAnswerChange = (e) => {
    setNewAnswer(e.target.value)
  }

  const handleCorrectnessChange = (e) => {
    setIsCorrect(e.target.value)
  }

  const onSubmit = () => {
    const validNewAnswer = newAnswer.trim()
    if (validNewAnswer === '') {
      return
    }
    const validIsCorrect = isCorrect === 'true' ? true : false
    const answer = { choice: validNewAnswer, isCorrect: validIsCorrect }
    onAddAnswer({ title, answer })
    setNewAnswer('')
    setIsCorrect(false)
  }

  return (
    <div className='question-container'>
      <h5>{title}</h5>
      <div className='answers-container'>
        {answers.map(QuestionAnswer)}
      </div>
      <div className='new-answer-container'>
        <label htmlFor='new-answer'>Add answer: </label>
        <input value={newAnswer} id='new-answer' onChange={handleAnswerChange} />
        <input
          name={`is-correct-${title}`}
          id={`false-option-${title}`}
          type='radio'
          defaultChecked={true}
          value={false}
          onClick={handleCorrectnessChange}
        />
        <label htmlFor={`false-option-${title}`}>false</label>
        <input
          name={`is-correct-${title}`}
          id={`true-option-${title}`}
          type='radio'
          value={true}
          onClick={handleCorrectnessChange}
        />
        <label htmlFor={`true-option-${title}`}>true</label>
        <button onClick={onSubmit} type='submit' disabled={newAnswer.trim() === ''}>Add</button>
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
