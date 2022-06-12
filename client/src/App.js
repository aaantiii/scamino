import NavBar from './components/NavBar'
import Routing from './Routing'
import Footer from './components/Footer'
import { AuthProvider } from './components/AuthContext'
import Dialog from './components/Dialog'

export default function App() {
  window.refreshTheme = () => {
    const customHexColor = localStorage.getItem('theme-hex')
    if (customHexColor) {
      document.querySelector(':root').style.setProperty('--theme-rgb', hexToRgb(customHexColor))
    }
  }
  window.onload = window.refreshTheme

  return (
    <AuthProvider>
      <div className="App">
        <NavBar />
        <div className="content-center">
          <div id="content-wrap">
            <Routing />
            <Dialog />
          </div>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  )
}

function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (result) {
    let r = parseInt(result[1], 16),
        g = parseInt(result[2], 16),
        b = parseInt(result[3], 16)
    return r+','+g+','+b
  } 
  return null
}
