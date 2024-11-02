import axios from 'axios';
import React, { useState } from 'react';

function InserirPacienteComponent() {
    const [pacienteData, setPacienteData] = useState({
        id_paciente: '',
        nome: '',
        cpf: '',
        email: '',
        rg: '',
        sexo: '',
        id_usuario: '',
        id_endereco: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPacienteData((prevData) => ({ ...prevData, [name]: value }));
    };

    const insertPaciente = async () => {
        setLoading(true);
        setError(null);
        try {
            await axios.post('http://localhost:5000/paciente', pacienteData);
            alert("Paciente inserido com sucesso!");
            setPacienteData({ id_paciente: '', nome: '', cpf: '', email: '', rg: '', sexo: '', id_usuario: '', id_endereco: '' });
        } catch (err) {
            console.error("Id já existente. Erro no post de paciente:", err);
            setError("Id já existente. Erro no post de paciente");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); insertPaciente(); }}>
                <label>ID Paciente:</label>
                <input
                    type="text"
                    name="id_paciente"
                    value={pacienteData.id_paciente}
                    onChange={handleChange}
                    required
                />
                <label>Nome:</label>
                <input
                    type="text"
                    name="nome"
                    value={pacienteData.nome}
                    onChange={handleChange}
                    required
                />
                <label>CPF:</label>
                <input
                    type="text"
                    name="cpf"
                    value={pacienteData.cpf}
                    onChange={handleChange}
                    required
                />
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={pacienteData.email}
                    onChange={handleChange}
                    required
                />
                <label>RG:</label>
                <input
                    type="text"
                    name="rg"
                    value={pacienteData.rg}
                    onChange={handleChange}
                    required
                />
                <label>Sexo:</label>
                <input
                    type="text"
                    name="sexo"
                    value={pacienteData.sexo}
                    onChange={handleChange}
                    required
                />
                <label>ID Usuário:</label>
                <input
                    type="text"
                    name="id_usuario"
                    value={pacienteData.id_usuario}
                    onChange={handleChange}
                    required
                />
                <label>ID Endereço:</label>
                <input
                    type="text"
                    name="id_endereco"
                    value={pacienteData.id_endereco}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading}>Inserir Paciente</button>
            </form>
            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}
        </div>
    );
}

export default InserirPacienteComponent;
