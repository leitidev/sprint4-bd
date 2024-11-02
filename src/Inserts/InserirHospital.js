import axios from 'axios';
import React, { useState } from 'react';

function InserirHospitalComponent() {
    const [hospitalData, setHospitalData] = useState({
        id_hospital: '',
        nr_cnpj: '',
        nm_razao_social: '',
        id_paciente: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHospitalData((prevData) => ({ ...prevData, [name]: value }));
    };

    const insertHospital = async () => {
        setLoading(true);
        setError(null);
        try {
            await axios.post('http://localhost:5000/hospital', hospitalData);
            alert("Hospital inserido com sucesso!");
            setHospitalData({ id_hospital: '', nr_cnpj: '', nm_razao_social: '', id_paciente: '' });
        } catch (err) {
            console.error("Id já existente. Erro no post de hospital:", err);
            setError("Id já existente. Erro no post de hospital");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); insertHospital(); }}>
                <label>ID Hospital:</label>
                <input
                    type="text"
                    name="id_hospital"
                    value={hospitalData.id_hospital}
                    onChange={handleChange}
                    required
                />
                <label>CNPJ:</label>
                <input
                    type="text"
                    name="nr_cnpj"
                    value={hospitalData.nr_cnpj}
                    onChange={handleChange}
                    required
                />
                <label>Razão Social:</label>
                <input
                    type="text"
                    name="nm_razao_social"
                    value={hospitalData.nm_razao_social}
                    onChange={handleChange}
                    required
                />
                <label>ID Paciente:</label>
                <input
                    type="text"
                    name="id_paciente"
                    value={hospitalData.id_paciente}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading}>Inserir Hospital</button>
            </form>
            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}
        </div>
    );
}

export default InserirHospitalComponent;
