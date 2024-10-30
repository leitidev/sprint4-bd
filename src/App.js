import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
                        <h2>password: {document.password}</h2>
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
                    <option value="exames">Exames</option>
                    <option value="funcionarios">Funcionários</option>
                    <option value="hospitais">Hospitais</option>
                    <option value="paciente">Pacientes</option>
                    <option value="triagens">Triagens</option>
                </select>
                <input
                    type="text"
                    placeholder="Buscar por ID"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit">Buscar</button>
            </form>
            <button onClick={insertRandomAddresses}>Inserir 10 Endereços aleatórios</button>
            <button onClick={insertRandomUsers}>Inserir 10 Usuários aleatórios</button>
            <button onClick={insertRandomPaciente}>Inserir 10 Pacientes aleatórios</button>
            {loading ? <p>Carregando...</p> : error ? <p>{error}</p> : (
                <ul>
                    {documents.length > 0 ? documents.map(renderDocument) : <p>Nenhum documento encontrado</p>}
                </ul>
            )}
        </div>
    );
}

export default App;
