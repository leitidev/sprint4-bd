import axios from 'axios';
import React, { useState } from 'react';

function InserirExameComponent() {
    const [exameData, setExameData] = useState({
        id_exame: '',
        dt_exame: '',
        ds_resultado: '',
        id_paciente: '',
        id_funcionario: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExameData((prevData) => ({ ...prevData, [name]: value }));
    };

    const insertExame = async () => {
        setLoading(true);
        setError(null);
        try {
            await axios.post('http://localhost:5000/exame', exameData);
            alert("Exame inserido com sucesso!");
            setExameData({ id_exame: '', dt_exame: '', ds_resultado: '', id_paciente: '', id_funcionario: '' });
        } catch (err) {
            console.error("Id já existente. Erro no post de exame:", err);
            setError("Id já existente. Erro no post de exame");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); insertExame(); }}>
                <label>ID Exame:</label>
                <input
                    type="text"
                    name="id_exame"
                    value={exameData.id_exame}
                    onChange={handleChange}
                    required
                />
                <label>Data do Exame:</label>
                <input
                    type="date"
                    name="dt_exame"
                    value={exameData.dt_exame}
                    onChange={handleChange}
                    required
                />
                <label>Resultado:</label>
                <input
                    type="text"
                    name="ds_resultado"
                    value={exameData.ds_resultado}
                    onChange={handleChange}
                    required
                />
                <label>ID Paciente:</label>
                <input
                    type="text"
                    name="id_paciente"
                    value={exameData.id_paciente}
                    onChange={handleChange}
                    required
                />
                <label>ID Funcionário:</label>
                <input
                    type="text"
                    name="id_funcionario"
                    value={exameData.id_funcionario}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading}>Inserir Exame</button>
            </form>
            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}
        </div>
    );
}

export default InserirExameComponent;
