import { useState } from 'react'
import { Link } from 'react-router-dom'
import './dafault.layout.scss'

const DefaultLayout = (Props: { children: any }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="default-layout">
      <nav className={open ? 'open' : ''}>
        <div className="icon-control">
          <i role="button" className={`fa-solid ${open ? 'fa-arrow-left-to-line' : 'fa-bars'}`} onClick={() => setOpen(!open)} />
        </div>
        {open ? (
          <div>
            <Link to="login/insecure" onClick={() => setOpen(false)}>
              <h5>Login Inseguro</h5>
            </Link>
            <Link to="login/secure" onClick={() => setOpen(false)}>
              <h5>Login Seguro</h5>
            </Link>
          </div>
        ) : null}
      </nav>
      <header>
        <h1>Trabalho de Conclusão de Curso (Jonas e Giovanni)</h1>
      </header>
      <div className="page">{Props.children}</div>
    </div>
  )
}

export default DefaultLayout
