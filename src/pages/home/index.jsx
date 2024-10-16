import { useState } from 'react'
import './index.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')

    const navigate = useNavigate()

    async function entrar() {
        const usuario = {
            "nome": nome,
            "senha": senha
        }

        const url = `http://localhost:7000/entrar`
        let resp = await axios.post(url, usuario)

        if (resp.data.erro != undefined) {
            alert(resp.data.erro)
        } else {
            localStorage.setItem('USUARIO', resp.data.token)
            navigate('/consultar')
        }
    }

    return (
        <div className='pagina-home'>
            <h1> Entrar </h1>

            <div className='secao'>
                <label htmlFor='nome'>Nome</label>
                <input
                    id='nome'
                    type='text'
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
            </div>

            <div className='secao'>
                <label htmlFor='senha'>Senha</label>
                <input
                    id='senha'
                    type='text'
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
            </div>

            <button onClick={entrar}>Entrar</button>
        </div>
    )
}
