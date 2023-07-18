import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const copyrightYears = currentYear === 2023 ? '2023' : `2023-${currentYear}`
  return (
    <div className='footer-container'>
      <p>Copyright {copyrightYears} by N.J.Valentine and The Flying Valentine</p>
    </div>
  )
}

export default Footer;
