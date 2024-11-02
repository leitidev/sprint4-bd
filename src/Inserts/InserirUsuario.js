import axios from 'axios';
import React, { useState } from 'react';

function InserirUsuarioComponent() {
    const [usuarioData, setUsuarioData] = useState({
        id_usuario: '',
        username: '',
        password: '',
        id_paciente: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuarioData((prevData) => ({ ...prevData, [name]: value }));
    };

    const insertUsuario = async () => {
        setLoading(true);
        setError(null);
        try {
            await axios.post('http://localhost:5000/usuario', usuarioData);
            alert("Usuário inserido com sucesso!");
            setUsuarioData({ id_usuario: '', username: '', password: '', id_paciente: '' });
        } catch (err) {
            console.error("Id já existente. Erro no post de usuário:", err);
            setError("Id já existente. Erro no post de usuário");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); insertUsuario(); }}>
                <label>ID Usuário:</label>
                <input
                    type="number"
                    name="id_usuario"
                    value={usuarioData.id_usuario}
                    onChange={handleChange}
                    required
                />
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={usuarioData.username}
                    onChange={handleChange}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={usuarioData.password}
                    onChange={handleChange}
                    required
                />
                <label>ID Paciente:</label>
                <input
                    type="number"
                    name="id_paciente"
                    value={usuarioData.id_paciente}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading}>Inserir Usuário</button>
            </form>
            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}
        </div>
    );
}

export default InserirUsuarioComponent;
