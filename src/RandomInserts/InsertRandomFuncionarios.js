import axios from 'axios';

const insertRandomFuncionario = async ({ setLoading, setError, fetchDocuments }) => {
    setLoading(true);
    setError(null);
    try {
        const randomFuncionarios = Array.from({ length: 10 }, (_, index) => ({
            id_funcionario: index + 1,
            nm_funcionario: `Funcionario ${index + 1}`,
            nr_cpf: `cpf${index + 1}`,
            ds_email: `email${index + 1}@exemplo.com`,
            id_hospital: Math.floor(Math.random() * 100) + 1
        }));
        await Promise.all(randomFuncionarios.map(funcionario =>
            axios.post(`http://localhost:5000/funcionario`, funcionario)
        ));
        fetchDocuments();
    } catch (err) {
        console.error("Id já existente. Erro no post de funcionários:", err);
        setError("Id já existente. Erro no post de funcionários");
    } finally {
        setLoading(false);
    }
}; 

export default insertRandomFuncionario;