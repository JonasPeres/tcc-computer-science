/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import InsecureSql from "../../assets/insecure/Insecure_sql.ico"
import "./sign-up-insecure.page.scss"
import axios from "axios"

const SignUpPageInsecure = () => {
  document.title = "TCC - Login Inseguro";
  const [form, setForm] = useState({
    user: '',
    password: '',
  })
  const [users, setUsers] = useState<any>([])

  useEffect(() => {
    let link: any = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = InsecureSql;
  }, []);

  const handleChange = useCallback(
    (field: string, value: any) => {
      setForm({
        ...form,
        [field]: value.target.value,
      })
    },
    [form]
  )

  const submit = useCallback(
    async () => {
      const response = await axios.post('http://127.0.0.1:5000/login/insecure', form)
      response.data.forEach((userData: any) => {
        users.push({id: userData[0], user: userData[1], password: userData[2]})
      })
      setUsers([...users])
    },
    [form, users]
  )

  return (
    <main className="sign-up-page">
      <h1>Login Inseguro</h1>
      <img src={InsecureSql} alt="Insecure SQL" />
      <form>
        <div className="wrapper-input">
          <label htmlFor="input-user">Usuário</label>
          <input id="input-user" value={form.user} onChange={(value) => handleChange('user', value)} type="text" />
        </div>
        <div className="wrapper-input">
          <label htmlFor="input-password">Senha</label>
          <input id="input-password" value={form.password} onChange={(value) => handleChange('password', value)} type="password" />
        </div>
      </form>
      <button onClick={submit}>
        Entrar
      </button>
      {users.map((user: any) => {
        console.log(user)
        return (
          <div key={user.id}>
            <p>Id: {user.id}</p>
            <p>Usuário: {user.user}</p>
            <p>Senha: {user.password}</p>
          </div>
        )
      })}
    </main>
  )
}

export default SignUpPageInsecure
