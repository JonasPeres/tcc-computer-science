/* eslint-disable @typescript-eslint/ban-ts-comment */
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import DefaultLayout from "./layouts/default/dafault.layout";
import SignUpInsecurePage from "./pages/sign-up-insecure/sign-up-insecure.page";
import SignUpSecurePage from "./pages/sign-up-secure/sign-up-secure.page";

function NoMatch() {
  return (
    <div>
      <h1>
        Rota "<code>{useLocation().pathname}</code>" não econtrada
      </h1>
    </div>
  );
}

export default function App() {
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
          <Route path="*" element={<NoMatch />}/>
        </Routes>
      </DefaultLayout>
    </BrowserRouter>
  );
}

// @ts-ignore
const root = ReactDOM.createRoot(document?.getElementById('root'));
root.render(<App />);