import axios from "axios";

const insertRandomTriagem = async ({ setLoading, setError, fetchDocuments }) => {
    setLoading(true);
    setError(null);
    try {
        const randomTriagens = Array.from({ length: 10 }, (_, index) => ({
            id_triagem: index + 1,
            dt_inicio: new Date(),
            dt_final: new Date(new Date().getTime() + (Math.floor(Math.random() * 1000000000))), // Data futura aleatória
            st_triagem: `Status${index + 1}`,
            ds_sintomas: `Sintomas${index + 1}`,
            id_paciente: Math.floor(Math.random() * 100) + 1
        }));
        await Promise.all(randomTriagens.map(triagem =>
            axios.post(`http://localhost:5000/triagem`, triagem)
        ));
        fetchDocuments();
    } catch (err) {
        console.error("Id já existente. Erro no post de triagens:", err);
        setError("Id já existente. Erro no post de triagens");
    } finally {
        setLoading(false);
    }
};       

export default insertRandomTriagem;