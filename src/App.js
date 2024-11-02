import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InsercaoDinamica from './Inserts/InsercaoDinamica';
import insertRandomPaciente from './RandomInserts/InsertRandomPacientes';
import insertRandomUsers from './RandomInserts/InsertRandomUsers';
import insertRandomExame from './RandomInserts/InsertRandomExames';
import insertRandomFuncionario from './RandomInserts/InsertRandomFuncionarios';
import insertRandomTriagem from './RandomInserts/InsertRandomTriagem';
import insertRandomHospital from './RandomInserts/InsertRandomHospital';
import insertRandomAddresses from './RandomInserts/InsertRandomEnderecos';

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

    const handleExport = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/export/${collection}`, {
                responseType: 'blob',
            });
    
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${collection}.json`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Erro ao exportar dados:", error.response || error.message);
            alert("Erro ao exportar dados");
        }
    };
    

    const renderDocument = (document) => {
        const handleDelete = async (id) => {
            try {
                const response = await fetch(`http://localhost:5000/${collection}/${id}`, {
                    method: 'DELETE',
                });
                const data = await response.json();
                if (response.ok) {
                    alert(data.message); 
                } else {
                    alert(data.message); 
                }
            } catch (error) {
                console.error("Erro ao excluir o documento:", error);
            }
        };
        const handleUpdate = async (id) => {
            // Exemplo básico de como obter novos dados para atualização
            const updatedFields = prompt("Insira os dados atualizados em JSON:");
            if (!updatedFields) return;
    
            try {
                const response = await fetch(`http://localhost:5000/${collection}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: updatedFields,
                });
                const data = await response.json();
                if (response.ok) {
                    alert("Documento atualizado com sucesso!");
                    // Atualize o estado aqui se necessário para refletir as mudanças
                } else {
                    alert(data.message); // Mensagem de erro
                }
            } catch (error) {
                console.error("Erro ao atualizar o documento:", error);
            }
        };        
        switch (collection) {
            case 'endereco':
                return (
                    <li key={document._id || document.id_endereco}>
                        <h2>ID Endereço: {document.id_endereco}</h2>
                        <p>{document.rua}, {document.numero}</p>
                        <p>{document.bairro}, {document.cidade} - {document.estado}</p>
                        <p>CEP: {document.cep}</p>
                        <p>Complemento: {document.complemento}</p>
                        <p>Referência: {document.referencia}</p>
                        <p>País: {document.pais}</p>
                        <button onClick={() => handleDelete(document.id_endereco)}>X</button>
                        <button onClick={() => handleUpdate(document.id_endereco)}>Update</button>
                    </li>
                );
                case 'usuario':
                    return (
                        <li key={document._id || document.id_usuario}>
                            <h2>ID Usuário: {document.id_usuario}</h2>
                            <p>Username: {document.username}</p>
                            <p>Password: {document.password}</p>
                            <p>ID Paciente: {document.id_paciente}</p>
                            <button onClick={() => handleDelete(document.id_usuario)}>X</button>
                            <button onClick={() => handleUpdate(document.id_usuario)}>Update</button>
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
                        <button onClick={() => handleDelete(document.id_paciente)}>X</button>
                        <button onClick={() => handleUpdate(document.id_paciente)}>Update</button>
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
                        <button onClick={() => handleDelete(document.id_triagem)}>X</button>
                        <button onClick={() => handleUpdate(document.id_triagem)}>Update</button>
                    </li>
                );
            case 'hospital':
                return (
                    <li key={document._id || document.id_hospital}>
                        <h2>ID Hospital: {document.id_hospital}</h2>
                        <p>CNPJ: {document.nr_cnpj}</p>
                        <p>Razão Social: {document.nm_razao_social}</p>
                        <p>ID Paciente: {document.id_paciente}</p>
                        <button onClick={() => handleDelete(document.id_hospital)}>X</button>
                        <button onClick={() => handleUpdate(document.id_hospital)}>Update</button>
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
                        <button onClick={() => handleDelete(document.id_funcionario)}>X</button>
                        <button onClick={() => handleUpdate(document.id_funcionario)}>Update</button>
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
                        <button onClick={() => handleDelete(document.id_exame)}>X</button>
                        <button onClick={() => handleUpdate(document.id_exame)}>Update</button>
                    </li>
                );
            default:
                return null;
        }
    };     

    return (
        <div className="App">
            <h2>Busca de documentos</h2>   
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
                <button onClick={handleExport}>Exportar {collection} como JSON</button>
                <input
                    type="text"
                    placeholder="Buscar por ID"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit">Buscar</button>
            </form>
            <p>Inserção com id's de um a dez. (10 documentos)</p>

            <button onClick={() => insertRandomAddresses({ setLoading, setError, fetchDocuments })}>Inserir Endereços</button>
            <button onClick={() => insertRandomUsers({ setLoading, setError, fetchDocuments })}>Inserir Usuários</button>
            <button onClick={() => insertRandomPaciente({ setLoading, setError, fetchDocuments })}>Inserir Pacientes</button>
            <button onClick={() => insertRandomTriagem({ setLoading, setError, fetchDocuments })}>Inserir Triagens</button>
            <button onClick={() => insertRandomHospital({ setLoading, setError, fetchDocuments })}>Inserir Hospitais</button>
            <button onClick={() => insertRandomFuncionario({ setLoading, setError, fetchDocuments })}>Inserir Funcionarios</button>
            <button onClick={() => insertRandomExame({ setLoading, setError, fetchDocuments })}>Inserir Exames</button>
            <InsercaoDinamica/>
            {loading ? <p>Carregando...</p> : error ? <p>{error}</p> : (
                <ul>
                    {documents.length > 0 ? documents.map(renderDocument) : <p>Nenhum documento encontrado</p>}
                </ul>
            )}
        </div>
    );
    
}

export default App;

