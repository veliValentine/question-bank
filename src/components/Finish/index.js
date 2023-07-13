import './Finish.css'

const Finish = ({
  result
}) => {
  const resultJson = JSON.stringify(result)
  const copyToClipboard = () => {
    navigator.clipboard.writeText(resultJson)
  }
  return (
    <div className='finish-container'>
      <h1>Final Result</h1>
      <p><label for='copyToClicboard'>Copy JSON to clipboard</label></p>
      <textarea value={resultJson} disabled />
      <button id='copyToClicboard' onClick={copyToClipboard}>Copy to clipboard</button>
    </div>
  )
}

export default Finish;
