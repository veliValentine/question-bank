import './NavBar.css'

const NavBar = ({
  pageNavigator
}) => {
  return (
    <div className='navbar-container'>
      <h4>Flying Valentine</h4>
      <span>Question Generator Tool</span>
      {NavButtons(pageNavigator)}
    </div>
  )
}

const NavButtons = (pageNavigator) => (
  <div className='button-container'>
    <button onClick={pageNavigator.add}>
      Add Questions
    </button>
    <button onClick={pageNavigator.template}>
      Add Template
    </button>
    <button onClick={pageNavigator.finish}>
      Finish
    </button>
  </div>
)

export default NavBar;
