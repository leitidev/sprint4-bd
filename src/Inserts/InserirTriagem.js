import axios from 'axios';
import React, { useState } from 'react';

function InserirTriagemComponent() {
    const [triagemData, setTriagemData] = useState({
        id_triagem: '',
        dt_inicio: '',
        dt_final: '',
        st_triagem: '',
        ds_sintomas: '',
        id_paciente: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTriagemData((prevData) => ({ ...prevData, [name]: value }));
    };

    const insertTriagem = async () => {
        setLoading(true);
        setError(null);
        try {
            await axios.post('http://localhost:5000/triagem', triagemData);
            alert("Triagem inserida com sucesso!");
            setTriagemData({ id_triagem: '', dt_inicio: '', dt_final: '', st_triagem: '', ds_sintomas: '', id_paciente: '' });
        } catch (err) {
            console.error("Erro ao inserir triagem:", err);
            setError("Erro ao inserir triagem");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); insertTriagem(); }}>
                <label>ID Triagem:</label>
                <input
                    type="text"
                    name="id_triagem"
                    value={triagemData.id_triagem}
                    onChange={handleChange}
                    required
                />
                <label>Data de Início:</label>
                <input
                    type="date"
                    name="dt_inicio"
                    value={triagemData.dt_inicio}
                    onChange={handleChange}
                    required
                />
                <label>Data de Final:</label>
                <input
                    type="date"
                    name="dt_final"
                    value={triagemData.dt_final}
                    onChange={handleChange}
                    required
                />
                <label>Status da Triagem:</label>
                <input
                    type="text"
                    name="st_triagem"
                    value={triagemData.st_triagem}
                    onChange={handleChange}
                    required
                />
                <label>Descrição dos Sintomas:</label>
                <input
                    type="text"
                    name="ds_sintomas"
                    value={triagemData.ds_sintomas}
                    onChange={handleChange}
                    required
                />
                <label>ID Paciente:</label>
                <input
                    type="text"
                    name="id_paciente"
                    value={triagemData.id_paciente}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading}>Inserir Triagem</button>
            </form>
            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}
        </div>
    );
}

export default InserirTriagemComponent;
