import axios from "axios";

const insertRandomAddresses = async ({ setLoading, setError, fetchDocuments }) => {
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
        console.error("Id já existente. Erro no post de endereços:", err);
        setError("Id já existente. Erro no post de endereços");
    } finally {
        setLoading(false);
    }
}; 

export default insertRandomAddresses;