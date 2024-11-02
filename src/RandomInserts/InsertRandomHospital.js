import axios from "axios";


const insertRandomHospital = async ({ setLoading, setError, fetchDocuments }) => {
    setLoading(true);
    setError(null);
    try {
        const randomHospitals = Array.from({ length: 10 }, (_, index) => ({
            id_hospital: index + 1,
            nr_cnpj: `cnpj${index + 1}`,
            nm_razao_social: `Hospital ${index + 1}`,
            id_paciente: Math.floor(Math.random() * 100) + 1
        }));
        await Promise.all(randomHospitals.map(hospital =>
            axios.post(`http://localhost:5000/hospital`, hospital)
        ));
        fetchDocuments();
    } catch (err) {
        console.error("Id já existente. Erro no post de hospitais:", err);
        setError("Id já existente. Erro no post de hospitais");
    } finally {
        setLoading(false);
    }
};   

export default insertRandomHospital;