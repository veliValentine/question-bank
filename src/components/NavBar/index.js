import './NavBar.css'

const NavBar = ({
  pageNavigator
}) => {
  return (
    <div className='navbar-container'>
      <span>Flying Valentine Question Generator Tool</span>
      {NavButtons(pageNavigator)}
    </div>
  )
}

const NavButtons = (pageNavigator) => (
  <div className='button-container'>
    <button onClick={pageNavigator.start}>
      Start
    </button>
    <button onClick={pageNavigator.add}>
      Add Questions
    </button>
    <button onClick={pageNavigator.finish}>
      Finish
    </button>
  </div>
)

export default NavBar;
