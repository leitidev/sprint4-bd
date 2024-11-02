import axios from 'axios';

const insertRandomUsers = async ({ setLoading, setError, fetchDocuments }) => {
    setLoading(true);
    setError(null);
    try {
        const randomUsers = Array.from({ length: 10 }, (_, index) => ({
            id_usuario: index + 1,
            username: `user${index + 1}`,
            password: `pass${index + 1}`,
            id_paciente: Math.floor(Math.random() * 100) + 1
        }));

        await Promise.all(randomUsers.map(user =>
            axios.post(`http://localhost:5000/usuario`, user)
        ));

        fetchDocuments();
    } catch (err) {
        console.error("Id já existente. Erro no post de usuários:", err);
        setError("Id já existente. Erro no post de usuários");
    } finally {
        setLoading(false);
    }
};

export default insertRandomUsers;