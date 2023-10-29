/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { DocumentHelper } from "../../helpers/document/document.helper"
import axios from "axios"
import InsecureSql from "../../assets/insecure/Insecure_sql.ico"
import "./sign-up-insecure.page.scss"
import { toast } from "react-toastify"

const SignUpPageInsecure = () => {
  const [form, setForm] = useState({
    user: '',
    password: '',
  })
  const [users, setUsers] = useState<any>([])

  useEffect(() => {
    const documentHelper = new DocumentHelper()
    documentHelper.setDocumentTitle("TCC - Login Inseguro")
    documentHelper.setDocumentFavicon(InsecureSql)
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
      try {
        const response = await axios.post('http://127.0.0.1:5000/login/insecure', form)
        response.data.forEach((userData: any) => {
          users.push({id: userData[0], user: userData[1], password: userData[2]})
        })
        toast.success('Sucesso')
        setUsers([...users])
      } catch(error: any) {
        toast(error.response.data.message)
      }
    },
    [form, users]
  )

  return (
    <main className="sign-up-insecure-page">
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
        return (
          <div className="card" key={user.id}>
            <p>Número do registro no banco: {user.id}</p>
            <p>Usuário: {user.user}</p>
            <p>Senha: {user.password}</p>
          </div>
        )
      })}
    </main>
  )
}

export default SignUpPageInsecure
