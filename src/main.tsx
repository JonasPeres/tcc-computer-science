/* eslint-disable @typescript-eslint/ban-ts-comment */
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import SignUpPageInsecure from "./pages/sign-up-insecure/sign-up-insecure.page";

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
        <Route path="login/insecure" element={<SignUpPageInsecure />} />
        <Route path="*" element={<NoMatch />}/>
      </Routes>
    </BrowserRouter>
  );
}

// @ts-ignore
const root = ReactDOM.createRoot(document?.getElementById('root'));
root.render(<App />);