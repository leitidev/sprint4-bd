import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [documents, setDocuments] = useState([]);
    const [search, setSearch] = useState('');
    const [collection, setCollection] = useState('enderecos');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDocuments();
    }, [collection]);

    const fetchDocuments = async () => {
      setLoading(true);
      setError(null);
      try {
          const response = await axios.get(`http://localhost:5000/${collection}`);
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
                id_endereco: index + 1, // Garante que o id_endereco seja de 1 a 10
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
                axios.post(`http://localhost:5000/enderecos`, address)
            ));
            
            fetchDocuments(); // Atualiza a lista após os inserts
        } catch (err) {
            console.error("Erro ao inserir endereços:", err);
            setError("Erro ao inserir endereços");
        } finally {
            setLoading(false);
        }
    };

    const renderDocument = (document) => {
        switch (collection) {
            case 'enderecos':
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
            // outros casos do renderDocument...
            default:
                return null;
        }
    };

    return (
        <div className="App">
            <h1>Documentos</h1>
            <form onSubmit={handleSearch}>
                <select value={collection} onChange={(e) => setCollection(e.target.value.toLowerCase())}>
                    <option value="enderecos">Endereços</option>
                    <option value="usuarios">Usuários</option>
                    <option value="exames">Exames</option>
                    <option value="funcionarios">Funcionários</option>
                    <option value="hospitais">Hospitais</option>
                    <option value="pacientes">Pacientes</option>
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
            <button onClick={insertRandomAddresses}>Inserir 10 Endereços</button>
            {loading ? <p>Carregando...</p> : error ? <p>{error}</p> : (
                <ul>
                    {documents.length > 0 ? documents.map(renderDocument) : <p>Nenhum documento encontrado</p>}
                </ul>
            )}
        </div>
    );
}

export default App;
