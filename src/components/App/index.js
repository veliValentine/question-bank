import Question from '../Question';
import './App.css';

const App = () => {
  const questions = [
    {
      title: 'Question 1',
      answers: [
        {
          choice: 'I\'m correct',
          isCorrect: true,
        },
        {
          choice: 'I\'m not correct',
          isCorrect: false,
        }
      ]
    },
    {
      title: 'Question 2',
      answers: [
        {
          choice: 'I\'m correct',
          isCorrect: true,
        },
        {
          choice: 'I\'m not correct',
          isCorrect: false,
        }
      ]
    }
  ]

  const onSubmit = (value) => console.log(value)

  return (
    <div>
      <h1>Welcome to Question Bank</h1>
      {questions.map(({ title, answers }) => (
        <Question
          title={title}
          answers={answers}
          submitAnswer={onSubmit}
        />
      ))}
    </div>
  );
}

export default App;
