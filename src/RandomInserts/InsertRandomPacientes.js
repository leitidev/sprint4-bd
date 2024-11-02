import axios from 'axios';

const insertRandomPaciente = async ({ setLoading, setError, fetchDocuments }) => {
    setLoading(true);
    setError(null);
    try {
        const randomPaciente = Array.from({ length: 10 }, (_, index) => ({
            id_paciente: index + 1,
            nome: `paciente${index + 1}`,
            cpf: `cpf${index + 1}`,
            email: `email${index + 1}`,
            rg: `rg${index + 1}`,
            sexo: `Não definido`,
            id_usuario: index + 1,
            id_endereco: index + 1,
        }));

        await Promise.all(randomPaciente.map(paciente =>
            axios.post(`http://localhost:5000/paciente`, paciente)
        ));

        fetchDocuments();
    } catch (err) {
        console.error("Id já existente. Erro no post de usuários:", err);
        setError("Id já existente. Erro no post de usuários");
    } finally {
        setLoading(false);
    }
};

export default insertRandomPaciente;
