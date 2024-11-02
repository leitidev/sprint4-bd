import axios from "axios";

const insertRandomExame = async ({ setLoading, setError, fetchDocuments }) => {
    setLoading(true);
    setError(null);
    try {
        const randomExames = Array.from({ length: 10 }, (_, index) => ({
            id_exame: index + 1,
            dt_exame: new Date(),
            ds_resultado: `Resultado${index + 1}`,
            id_paciente: Math.floor(Math.random() * 100) + 1,
            id_funcionario: Math.floor(Math.random() * 100) + 1
        }));
        await Promise.all(randomExames.map(exame =>
            axios.post(`http://localhost:5000/exame`, exame)
        ));
        fetchDocuments();
    } catch (err) {
        console.error("Id já existente. Erro no post de exames:", err);
        setError("Id já existente. Erro no post de exames");
    } finally {
        setLoading(false);
    }
};    

export default insertRandomExame;
