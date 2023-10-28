
import { useState } from 'react'
import { Link } from "react-router-dom";
import MenuPng from '../../assets/png/menu.png'
import ArrowPng from '../../assets/png/arrow.png'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './dafault.layout.scss'

const DefaultLayout = (Props: {children: any}) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="default-layout">
      <nav className={open ? 'open' : ''}>
        <img src={open ? ArrowPng : MenuPng} alt="Menu" onClick={() => setOpen(!open)}/>
        {open ? (
          <div>
            <Link to="login/insecure">
              <h5>
                Login Inseguro
              </h5>
            </Link>
            <Link to="login/secure">
              <h5>
                Login Seguro
              </h5>
            </Link>
          </div>
        ) : null}
      </nav>
      <div className='page-content'>
        {Props.children}
      </div>
      <ToastContainer />
    </div>
  )
}

export default DefaultLayout