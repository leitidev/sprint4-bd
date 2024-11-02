import axios from 'axios';
import React, { useState } from 'react';

function InserirEnderecoComponent() {
    const [enderecoData, setEnderecoData] = useState({
        id_endereco: '',
        estado: '',
        cidade: '',
        bairro: '',
        rua: '',
        numero: '',
        complemento: '',
        cep: '',
        referencia: '',
        pais: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEnderecoData((prevData) => ({ ...prevData, [name]: value }));
    };

    const insertEndereco = async () => {
        setLoading(true);
        setError(null);
        try {
            await axios.post('http://localhost:5000/endereco', enderecoData);
            alert("Endereço inserido com sucesso!");
            setEnderecoData({
                id_endereco: '',
                estado: '',
                cidade: '',
                bairro: '',
                rua: '',
                numero: '',
                complemento: '',
                cep: '',
                referencia: '',
                pais: '',
            });
        } catch (err) {
            console.error("Id já existente. Erro no post de endereço:", err);
            setError("Id já existente. Erro no post de endereço");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); insertEndereco(); }}>
                <label>ID Endereço:</label>
                <input
                    type="text"
                    name="id_endereco"
                    value={enderecoData.id_endereco}
                    onChange={handleChange}
                    required
                />
                <label>Estado:</label>
                <input
                    type="text"
                    name="estado"
                    value={enderecoData.estado}
                    onChange={handleChange}
                    required
                />
                <label>Cidade:</label>
                <input
                    type="text"
                    name="cidade"
                    value={enderecoData.cidade}
                    onChange={handleChange}
                    required
                />
                <label>Bairro:</label>
                <input
                    type="text"
                    name="bairro"
                    value={enderecoData.bairro}
                    onChange={handleChange}
                    required
                />
                <label>Rua:</label>
                <input
                    type="text"
                    name="rua"
                    value={enderecoData.rua}
                    onChange={handleChange}
                    required
                />
                <label>Número:</label>
                <input
                    type="number"
                    name="numero"
                    value={enderecoData.numero}
                    onChange={handleChange}
                    required
                />
                <label>Complemento:</label>
                <input
                    type="text"
                    name="complemento"
                    value={enderecoData.complemento}
                    onChange={handleChange}
                />
                <label>CEP:</label>
                <input
                    type="text"
                    name="cep"
                    value={enderecoData.cep}
                    onChange={handleChange}
                    required
                />
                <label>Referência:</label>
                <input
                    type="text"
                    name="referencia"
                    value={enderecoData.referencia}
                    onChange={handleChange}
                />
                <label>País:</label>
                <input
                    type="text"
                    name="pais"
                    value={enderecoData.pais}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading}>Inserir Endereço</button>
            </form>
            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}
        </div>
    );
}

export default InserirEnderecoComponent;
