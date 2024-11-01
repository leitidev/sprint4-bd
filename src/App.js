import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InserirExameComponent from './InserirExame';

function App() {
    const [documents, setDocuments] = useState([]);
    const [search, setSearch] = useState('');
    const [collection, setCollection] = useState('endereco');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDocuments();
    }, [collection]);

    const fetchDocuments = async () => {
        console.log("Coleção atual:", collection);  // Log do nome da coleção
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:5000/${collection}`);
            console.log("Documentos recebidos:", response.data);  // Log dos dados recebidos
            setDocuments(response.data);
        } catch (err) {
            console.error("Erro ao buscar documentos:", err.response ? err.response.data : err);
            setError(err.response ? err.response.data.message : "Erro ao buscar documentos");
            setDocuments([]);
        } finally {
            setLoading(false);
        }
    };


    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search) return;

        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:5000/${collection}/${search}`);
            setDocuments(response.data ? [response.data] : []);
        } catch (err) {
            console.error("Erro ao buscar documento:", err);
            setError("Erro ao buscar documento");
            setDocuments([]);
        } finally {
            setLoading(false);
        }
    };

    const insertRandomAddresses = async () => {
        setLoading(true);
        setError(null);
        try {
            const randomAddresses = Array.from({ length: 10 }, (_, index) => ({
                id_endereco: index + 1,
                estado: 'SP',
                cidade: 'São Paulo',
                bairro: 'Centro',
                rua: `Rua Aleatória ${index + 1}`,
                numero: Math.floor(Math.random() * 1000) + 1,
                complemento: 'Apto 101',
                cep: '01000-000',
                referencia: 'Perto do ponto de referência',
                pais: 'Brasil',
            }));

            await Promise.all(randomAddresses.map(address =>
                axios.post(`http://localhost:5000/endereco`, address)
            ));

            fetchDocuments();
        } catch (err) {
            console.error("Erro ao inserir endereços:", err);
            setError("Erro ao inserir endereços");
        } finally {
            setLoading(false);
        }
    };

    const insertRandomUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const randomUsers = Array.from({ length: 10 }, (_, index) => ({
                id_usuario: index + 1,
                username: `user${index + 1}`,
                password: `pass${index + 1}`,
                id_paciente: Math.floor(Math.random() * 100) + 1
            }));

            await Promise.all(randomUsers.map(user =>
                axios.post(`http://localhost:5000/usuario`, user)
            ));

            fetchDocuments();
        } catch (err) {
            console.error("Erro ao inserir usuários:", err);
            setError("Erro ao inserir usuários");
        } finally {
            setLoading(false);
        }
    };


    const insertRandomPaciente = async () => {
        setLoading(true);
        setError(null);
        try {
            const randomPaciente = Array.from({ length: 10 }, (_, index) => ({
                id_paciente: index + 1,
                nome: `paciente${index + 1}`,
                cpf: `cpf${index + 1}`,
                email: `email${index + 1}`,
                rg: `rg${index + 1}`,
                sexo: `Não definido`,
                cpf: `cpf${index + 1}`,
                id_usuario: index + 1,
                id_endereco: index + 1,
            }));

            await Promise.all(randomPaciente.map(paciente =>
                axios.post(`http://localhost:5000/paciente`, paciente)
            ));

            fetchDocuments();
        } catch (err) {
            console.error("Erro ao inserir usuários:", err);
            setError("Erro ao inserir usuários");
        } finally {
            setLoading(false);
        }
    };

    const insertRandomTriagem = async () => {
        setLoading(true);
        setError(null);
        try {
            const randomTriagens = Array.from({ length: 10 }, (_, index) => ({
                id_triagem: index + 1,
                dt_inicio: new Date(),
                dt_final: new Date(new Date().getTime() + (Math.floor(Math.random() * 1000000000))), // Data futura aleatória
                st_triagem: `Status${index + 1}`,
                ds_sintomas: `Sintomas${index + 1}`,
                id_paciente: Math.floor(Math.random() * 100) + 1
            }));
            await Promise.all(randomTriagens.map(triagem =>
                axios.post(`http://localhost:5000/triagem`, triagem)
            ));
            fetchDocuments();
        } catch (err) {
            console.error("Erro ao inserir triagens:", err);
            setError("Erro ao inserir triagens");
        } finally {
            setLoading(false);
        }
    };    

    const insertRandomFuncionario = async () => {
        setLoading(true);
        setError(null);
        try {
            const randomFuncionarios = Array.from({ length: 10 }, (_, index) => ({
                id_funcionario: index + 1,
                nm_funcionario: `Funcionario ${index + 1}`,
                nr_cpf: `cpf${index + 1}`,
                ds_email: `email${index + 1}@exemplo.com`,
                id_hospital: Math.floor(Math.random() * 100) + 1
            }));
            await Promise.all(randomFuncionarios.map(funcionario =>
                axios.post(`http://localhost:5000/funcionario`, funcionario)
            ));
            fetchDocuments();
        } catch (err) {
            console.error("Erro ao inserir funcionários:", err);
            setError("Erro ao inserir funcionários");
        } finally {
            setLoading(false);
        }
    };    

    const insertRandomHospital = async () => {
        setLoading(true);
        setError(null);
        try {
            const randomHospitals = Array.from({ length: 10 }, (_, index) => ({
                id_hospital: index + 1,
                nr_cnpj: `cnpj${index + 1}`,
                nm_razao_social: `Hospital ${index + 1}`,
                id_paciente: Math.floor(Math.random() * 100) + 1
            }));
            await Promise.all(randomHospitals.map(hospital =>
                axios.post(`http://localhost:5000/hospital`, hospital)
            ));
            fetchDocuments();
        } catch (err) {
            console.error("Erro ao inserir hospitais:", err);
            setError("Erro ao inserir hospitais");
        } finally {
            setLoading(false);
        }
    };    

    const insertRandomExame = async () => {
        setLoading(true);
        setError(null);
        try {
            const randomExames = Array.from({ length: 10 }, (_, index) => ({
                id_exame: index + 1,
                dt_exame: new Date(),
                ds_resultado: `Resultado${index + 1}`,
                id_paciente: Math.floor(Math.random() * 100) + 1,
                id_funcionario: Math.floor(Math.random() * 100) + 1
            }));
            await Promise.all(randomExames.map(exame =>
                axios.post(`http://localhost:5000/exame`, exame)
            ));
            fetchDocuments();
        } catch (err) {
            console.error("Erro ao inserir exames:", err);
            setError("Erro ao inserir exames");
        } finally {
            setLoading(false);
        }
    };    

    const renderDocument = (document) => {
        switch (collection) {
            case 'endereco':
                return (
                    <li key={document._id || document.id_endereco}>
                        <h2>{document.rua}, {document.numero}</h2>
                        <p>{document.bairro}, {document.cidade} - {document.estado}</p>
                        <p>CEP: {document.cep}</p>
                        <p>Complemento: {document.complemento}</p>
                        <p>Referência: {document.referencia}</p>
                        <p>País: {document.pais}</p>
                    </li>
                );
            case 'usuario':
                return (
                    <li key={document._id || document.id_usuario}>
                        <h2>Username: {document.username}</h2>
                        <h2>Password: {document.password}</h2>
                        <p>ID Paciente: {document.id_paciente}</p>
                    </li>
                );
            case 'paciente':
                return (
                    <li key={document._id || document.id_paciente}>
                        <p>Nome: {document.nome}</p>
                        <p>CPF: {document.cpf}</p>
                        <p>Email: {document.email}</p>
                        <p>RG: {document.rg}</p>
                        <p>Sexo: {document.sexo}</p>
                        <p>Usuario ID: {document.id_usuario}</p>
                        <p>Endereço ID: {document.id_endereco}</p>
                    </li>
                );
            case 'triagem':
                return (
                    <li key={document._id || document.id_triagem}>
                        <h2>ID Triagem: {document.id_triagem}</h2>
                        <p>Data Início: {new Date(document.dt_inicio).toLocaleString()}</p>
                        <p>Data Final: {new Date(document.dt_final).toLocaleString()}</p>
                        <p>Status: {document.st_triagem}</p>
                        <p>Sintomas: {document.ds_sintomas}</p>
                        <p>ID Paciente: {document.id_paciente}</p>
                    </li>
                );
            case 'hospital':
                return (
                    <li key={document._id || document.id_hospital}>
                        <h2>ID Hospital: {document.id_hospital}</h2>
                        <p>CNPJ: {document.nr_cnpj}</p>
                        <p>Razão Social: {document.nm_razao_social}</p>
                        <p>ID Paciente: {document.id_paciente}</p>
                    </li>
                );
            case 'funcionario':
                return (
                    <li key={document._id || document.id_funcionario}>
                        <h2>ID Funcionário: {document.id_funcionario}</h2>
                        <p>Nome: {document.nm_funcionario}</p>
                        <p>CPF: {document.nr_cpf}</p>
                        <p>Email: {document.ds_email}</p>
                        <p>ID Hospital: {document.id_hospital}</p>
                    </li>
                );
            case 'exame':
                return (
                    <li key={document._id || document.id_exame}>
                        <h2>ID Exame: {document.id_exame}</h2>
                        <p>Data do Exame: {new Date(document.dt_exame).toLocaleString()}</p>
                        <p>Resultado: {document.ds_resultado}</p>
                        <p>ID Paciente: {document.id_paciente}</p>
                        <p>ID Funcionário: {document.id_funcionario}</p>
                    </li>
                );
            default:
                return null;
        }
    };     

    return (
        <div className="App">
            <h1>Documentos</h1>   
            <form onSubmit={handleSearch}>
                <select value={collection} onChange={(e) => setCollection(e.target.value.toLowerCase())}>
                    <option value="endereco">Endereços</option>
                    <option value="usuario">Usuários</option>
                    <option value="exame">Exames</option>
                    <option value="funcionario">Funcionários</option>
                    <option value="hospital">Hospitais</option>
                    <option value="paciente">Pacientes</option>
                    <option value="triagem">Triagens</option>
                </select>
                <input
                    type="text"
                    placeholder="Buscar por ID"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit">Buscar</button>
            </form>
    
            {/* Seus botões e lógica continuam aqui */}
            <button onClick={insertRandomAddresses}>Inserir 10 Endereços aleatórios</button>
            <button onClick={insertRandomUsers}>Inserir 10 Usuários aleatórios</button>
            <button onClick={insertRandomPaciente}>Inserir 10 Pacientes aleatórios</button>
            <button onClick={insertRandomTriagem}>Inserir 10 Triagens aleatórios</button>
            <button onClick={insertRandomHospital}>Inserir 10 Hospitais aleatórios</button>
            <button onClick={insertRandomFuncionario}>Inserir 10 Funcionários aleatórios</button>
            <button onClick={insertRandomExame}>Inserir 10 Exames aleatórios</button>  
            {loading ? <p>Carregando...</p> : error ? <p>{error}</p> : (
                <ul>
                    {documents.length > 0 ? documents.map(renderDocument) : <p>Nenhum documento encontrado</p>}
                </ul>
            )}
        </div>
    );
    
}

export default App;

<InserirExameComponent/>