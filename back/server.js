const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/HospitalDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(error => console.error('Erro ao conectar ao MongoDB:', error));

// Schemas para cada coleção
const schemas = {
    endereco: new mongoose.Schema({
        id_endereco: { type: Number, unique: true },
        estado: String,
        cidade: String,
        bairro: String,
        rua: String,
        numero: Number,
        complemento: String,
        cep: String,
        referencia: String,
        pais: String
    }),
    usuario: new mongoose.Schema({
        id_usuario: { type: Number, unique: true },
        username: String,
        password: String,
        id_paciente: Number
    }),
    paciente: new mongoose.Schema({
        id_paciente: { type: Number, unique: true },
        nome: String,
        cpf: String,
        email: String,
        rg: String,
        sexo: String,
        id_usuario: Number,
        id_endereco: Number
    })
};

// Modelos baseados nos schemas
const models = {
    endereco: mongoose.model('endereco', schemas.endereco),
    usuario: mongoose.model('usuario', schemas.usuario),
    paciente: mongoose.model('paciente', schemas.paciente)
};

app.use(cors());
app.use(express.json());

app.get('/:collection', async (req, res) => {
    const { collection } = req.params;
    if (models[collection.toLowerCase()]) {
        try {
            const documents = await models[collection.toLowerCase()].find();
            res.send(documents);
        } catch (error) {
            console.error(`Erro ao buscar documentos em ${collection}:`, error);
            res.status(500).send({ message: 'Erro ao buscar documentos' });
        }
    } else {
        res.status(404).send({ message: 'Coleção não encontrada' });
    }
});

app.get('/:collection/:id', async (req, res) => {
    const { collection, id } = req.params;
    console.log(`Buscando documento na coleção ${collection} com id: ${id}`);

    if (models[collection.toLowerCase()]) {
        try {
            const numericId = parseInt(id);
            if (isNaN(numericId)) {
                return res.status(400).send({ message: 'ID inválido' });
            }

            // Determina o campo ID com base na coleção
            const idField = `id_${collection.toLowerCase()}`;
            const document = await models[collection.toLowerCase()].findOne({ [idField]: numericId });

            if (document) {
                console.log(`Documento encontrado: ${JSON.stringify(document)}`);
                res.send(document);
            } else {
                console.log(`Documento não encontrado na coleção ${collection} com id: ${id}`);
                res.status(404).send({ message: 'Documento não encontrado' });
            }
        } catch (error) {
            console.error(`Erro ao buscar documento em ${collection} com ID ${id}:`, error);
            res.status(500).send({ message: 'Erro ao buscar documento' });
        }
    } else {
        res.status(404).send({ message: 'Coleção não encontrada' });
    }
});



app.post('/:collection', async (req, res) => {
    const { collection } = req.params;
    if (models[collection.toLowerCase()]) {
        try {
            const document = new models[collection.toLowerCase()](req.body);
            await document.save();
            res.status(201).send(document);
        } catch (error) {
            console.error(`Erro ao criar documento em ${collection}:`, error);
            res.status(500).send({ message: 'Erro ao criar documento' });
        }
    } else {
        res.status(404).send({ message: 'Coleção não encontrada' });
    }
});

app.put('/:collection/:id', async (req, res) => {
    const { collection, id } = req.params;
    if (models[collection.toLowerCase()]) {
        try {
            const document = await models[collection.toLowerCase()].findOneAndUpdate(
                { [`id_${collection.toLowerCase()}`]: parseInt(id) },
                req.body,
                { new: true }
            );
            if (document) {
                res.send(document);
            } else {
                res.status(404).send({ message: 'Documento não encontrado' });
            }
        } catch (error) {
            console.error(`Erro ao atualizar documento em ${collection} com ID ${id}:`, error);
            res.status(500).send({ message: 'Erro ao atualizar documento' });
        }
    } else {
        res.status(404).send({ message: 'Coleção não encontrada' });
    }
});

app.delete('/:collection/:id', async (req, res) => {
    const { collection, id } = req.params;
    if (models[collection.toLowerCase()]) {
        try {
            const document = await models[collection.toLowerCase()].findOneAndDelete({ [`id_${collection.toLowerCase()}`]: parseInt(id) });
            if (document) {
                res.send({ message: 'Documento excluído' });
            } else {
                res.status(404).send({ message: 'Documento não encontrado' });
            }
        } catch (error) {
            console.error(`Erro ao excluir documento em ${collection} com ID ${id}:`, error);
            res.status(500).send({ message: 'Erro ao excluir documento' });
        }
    } else {
        res.status(404).send({ message: 'Coleção não encontrada' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
