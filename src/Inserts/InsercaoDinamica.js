import React, { useState } from 'react';
import InserirExameComponent from './InserirExame';
import InserirUsuarioComponent from './InserirUsuario';
import InserirEnderecoComponent from './InserirEndereco';
import InserirFuncionarioComponent from './InserirFuncionario.js';
import InserirHospitalComponent from './InserirHospital.js';
import InserirPacienteComponent from './InserirPaciente.js';
import InserirTriagemComponent from './InserirTriagem.js';

function InsercaoDinamica() {
    const [collection, setCollection] = useState('');

    const renderInsercaoComponent = () => {
        switch (collection) {
            case 'exame':
                return <InserirExameComponent />;
            case 'usuario':
                return <InserirUsuarioComponent/>;
            case 'endereco':
                return <InserirEnderecoComponent/>;
            case 'funcionario':
                return <InserirFuncionarioComponent/>;
            case 'hospital':
                return <InserirHospitalComponent/>;
            case 'paciente':
                return <InserirPacienteComponent/>;
            case 'triagem':
                return <InserirTriagemComponent/>;
            default:
                return <p>Selecione uma coleção para inserir dados.</p>;
        }
    };

    return (
        <div>
            <h2>Inserção de dados manual</h2>
            <select value={collection} onChange={(e) => setCollection(e.target.value.toLowerCase())}>
                <option value="">Selecione uma coleção</option>
                <option value="endereco">Endereços</option>
                <option value="usuario">Usuários</option>
                <option value="exame">Exames</option>
                <option value="funcionario">Funcionários</option>
                <option value="hospital">Hospitais</option>
                <option value="paciente">Pacientes</option>
                <option value="triagem">Triagens</option>
            </select>

            {/* Renderiza o componente de inserção correspondente */}
            <div className="insercao-component">
                {renderInsercaoComponent()}
            </div>
        </div>
    );
}

export default InsercaoDinamica;
