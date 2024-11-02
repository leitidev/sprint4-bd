import axios from 'axios';
import React, { useState } from 'react';

function InserirFuncionarioComponent() {
    const [funcionarioData, setFuncionarioData] = useState({
        id_funcionario: '',
        nm_funcionario: '',
        nr_cpf: '',
        ds_email: '',
        id_hospital: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFuncionarioData((prevData) => ({ ...prevData, [name]: value }));
    };

    const insertFuncionario = async () => {
        setLoading(true);
        setError(null);
        try {
            await axios.post('http://localhost:5000/funcionario', funcionarioData);
            alert("Funcionário inserido com sucesso!");
            setFuncionarioData({ id_funcionario: '', nm_funcionario: '', nr_cpf: '', ds_email: '', id_hospital: '' });
        } catch (err) {
            console.error("Erro ao inserir funcionário:", err);
            setError("Erro ao inserir funcionário");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); insertFuncionario(); }}>
                <label>ID Funcionário:</label>
                <input
                    type="text"
                    name="id_funcionario"
                    value={funcionarioData.id_funcionario}
                    onChange={handleChange}
                    required
                />
                <label>Nome do Funcionário:</label>
                <input
                    type="text"
                    name="nm_funcionario"
                    value={funcionarioData.nm_funcionario}
                    onChange={handleChange}
                    required
                />
                <label>CPF:</label>
                <input
                    type="text"
                    name="nr_cpf"
                    value={funcionarioData.nr_cpf}
                    onChange={handleChange}
                    required
                />
                <label>Email:</label>
                <input
                    type="email"
                    name="ds_email"
                    value={funcionarioData.ds_email}
                    onChange={handleChange}
                    required
                />
                <label>ID Hospital:</label>
                <input
                    type="text"
                    name="id_hospital"
                    value={funcionarioData.id_hospital}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading}>Inserir Funcionário</button>
            </form>
            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}
        </div>
    );
}

export default InserirFuncionarioComponent;
