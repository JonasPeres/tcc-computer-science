import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import DefaultLayout from './layouts/default/dafault.layout'
import SignUpInsecurePage from './pages/sign-up-insecure/sign-up-insecure.page'
import SignUpSecurePage from './pages/sign-up-secure/sign-up-secure.page'
import Toast from '@squidit/css/src/js/components/toast'
import './main.scss'

function NoMatch() {
  return (
    <div>
      <h1>
        Rota "<code>{useLocation().pathname}</code>" não econtrada
      </h1>
    </div>
  )
}

export default function App() {
  // eslint-disable-next-line no-labels
  Toast: typeof Toast
  window['Toast' as any] = Toast

  return (
    <BrowserRouter>
      <DefaultLayout>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={{
                  pathname: 'login/insecure',
                }}
              />
            }
          />
          <Route path="login/insecure" element={<SignUpInsecurePage />} />
          <Route path="login/secure" element={<SignUpSecurePage />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </DefaultLayout>
    </BrowserRouter>
  )
}

ReactDOM.createRoot((document as any)?.getElementById('root')).render(<App />)
