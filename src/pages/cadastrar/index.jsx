import { useEffect, useState } from 'react'
import './index.scss'

import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';



export default function Cadastrar() {
    const [token, setToken] = useState(null);

    const [dia, setDia] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [usuario, setUsuario] = useState('');

    const navigate = useNavigate()

    const { id } = useParams();

    async function salvar() {
        let paramCorpo = {
            "dia": dia,
            "conteudo": conteudo,
            "usuario": usuario
        }

        if (id == undefined) {
            // CRIAR
            const url = `http://localhost:7000/diario?x-access-token=${token}`;
            let resp = await axios.post(url, paramCorpo);
            alert('Nova nota no diário. Id: ' + resp.data.idDiario);
        } else {
            // ALTERAR
            const url = `http://localhost:7000/diario/${id}?x-access-token=${token}`;
            let resp = await axios.put(url, paramCorpo);
            alert('Nota alterada no diário.');
        }
    }

    async function consultar(token) {
        if (id != undefined) {
            const url = `http://localhost:7000/diario/${id}?x-access-token=${token}`;
            let resp = await axios.get(url);
            let dados = resp.data;

            setDia(dados.dia)
            setConteudo(dados.conteudo)
            setUsuario(dados.usuario)
        }
    }

    useEffect(() => {
        let token = localStorage.getItem('USUARIO')
        setToken(token)

        if (token == 'null') {
            navigate('/')
        }

        consultar(token);
    }, [])

    return (
        <div className='pagina-cadastrar'>
            <button><Link to={'/consultar'}>Voltar</Link></button>
            <h1>{id ? 'EDITAR' : 'CADASTRAR'}</h1>


            <div className='form'>
                <div>
                    <label>Dia:</label>
                    <input
                        type='date'
                        value={dia}
                        onChange={e => setDia(e.target.value)} />
                </div>
                <div>
                    <label>Conteúdo:</label>
                    <input
                        type='text'
                        value={conteudo}
                        onChange={e => setConteudo(e.target.value)} />
                </div>
                <div>
                    <label>Usuario:</label>
                    <input
                        type='text'
                        value={usuario}
                        onChange={e => setUsuario(e.target.value)} />
                </div>
            </div>
            <button onClick={salvar}> SALVAR </button>

        </div>
    )
}
