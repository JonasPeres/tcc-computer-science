import axios from 'axios'
import { useCallback, useEffect, useMemo, useState } from 'react'
import InsecureSql from '../../assets/Insecure_sql.ico'
import Button from '../../components/button/button.component'
import Input from '../../components/input/input.component'
import { DocumentHelper } from '../../helpers/document.helper'
import ToastHelper from '../../helpers/toast.helper'
import './sign-up-insecure.page.scss'

const SignUpPageInsecure = () => {
  const toast = useMemo(() => new ToastHelper().toast, [])
  const documentHelper = useMemo(() => new DocumentHelper(), [])
  const [form, setForm] = useState({
    user: '',
    password: '',
  })
  const [users, setUsers] = useState<any>([])

  useEffect(() => {
    documentHelper.setDocumentTitle('TCC - Login Inseguro')
    documentHelper.setDocumentFavicon(InsecureSql)
  }, [documentHelper])

  const handleChange = useCallback(
    (field: string, value: any) => {
      setForm({
        ...form,
        [field]: value,
      })
    },
    [form],
  )

  const submit = useCallback(async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/login/insecure', form)
      response.data.forEach((userData: any) => {
        if (!users.find((user: any) => user.id === userData[0])) {
          users.push({ id: userData[0], user: userData[1], password: userData[2] })
        }
      })
      setUsers([...users])
      toast.success('Sucesso', { position: 'top right', closeButton: true })
    } catch (error: any) {
      toast.error(error.response.data.mensagem, { position: 'top right' })
    }
  }, [form, users, toast])

  return (
    <main className="sign-up-insecure-page">
      <h1>Login Inseguro (Vulnerável a SQL Injection)</h1>
      <img src={InsecureSql} alt="Insecure SQL" />
      <form>
        <Input label="Usuário" value={form.user} onChange={(value) => handleChange('user', value)} />
        <Input label="Senha" value={form.password} onChange={(value) => handleChange('password', value)} type="password" />
        <Button onClick={submit} color="var(--green)" borderColor="var(--green)">
          Enviar
        </Button>
      </form>
      <div className="wrapper-boxes">
        {users.map((user: any) => {
          return (
            <div className="box" key={user.id}>
              <p>Número do registro no banco: {user.id}</p>
              <p>Usuário: {user.user}</p>
              <p>Senha: {user.password}</p>
            </div>
          )
        })}
      </div>
    </main>
  )
}

export default SignUpPageInsecure
