/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react"
import { DocumentHelper } from "../../helpers/document/document.helper"
import axios from "axios"
import SecureSql from "../../assets/secure/Secure_sql.ico"
import "./sign-up-secure.page.scss"
import { toast } from "react-toastify"

const SignUpSecurePage = () => {
  const [form, setForm] = useState({
    user: '',
    password: '',
  })
  const [users, setUsers] = useState<any>([])

  useEffect(() => {
    const documentHelper = new DocumentHelper()
    documentHelper.setDocumentTitle("TCC - Login Seguro")
    documentHelper.setDocumentFavicon(SecureSql)
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
        const response = await axios.post('http://127.0.0.1:5000/login/secure', form)
        response.data.forEach((userData: any) => {
          users.push({id: userData[0], user: userData[1], password: userData[2]})
        })
        setUsers([...users])
        toast.success('Sucesso')
      } catch(error: any) {
        toast.error(error.response.data.mensagem)
      }
    },
    [form, users]
  )

  return (
    <main className="sign-up-secure-page">
      <h1>Login Seguro</h1>
      <img src={SecureSql} alt="Insecure SQL" />
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

export default SignUpSecurePage
