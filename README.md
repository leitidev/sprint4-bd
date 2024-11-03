<h1 align="center">Projeto SPRINT4-BD</h1>

<p align="center">
  Este projeto faz parte da Sprint 4 de um desafio de banco de dados, onde foi implementado um sistema com back-end e front-end utilizando MongoDB como banco de dados NoSQL. O projeto tem uma estrutura que divide as pastas e arquivos entre front-end e back-end, e inclui operações CRUD para manipulação de dados.
</p>

<h2>⚙️ Pré-requisitos</h2>

<p>Para executar este projeto, é necessário ter as seguintes ferramentas instaladas:</p>
<ul>
  <li><a href="https://nodejs.org/">Node.js</a> (versão 14 ou superior)</li>
  <li><a href="https://www.mongodb.com/try/download/community">MongoDB</a> (local ou MongoDB Atlas)</li>
</ul>

<h2>🚀 Instalação e Execução</h2>

<ol>
  <li>Clone o repositório do projeto:
    <pre><code>git clone &lt;URL_DO_REPOSITORIO&gt;</code></pre>
  </li>
  <li>Acesse a pasta do projeto:
    <pre><code>cd SPRINT4-BD</code></pre>
  </li>
  <li>Instale as dependências do projeto:
    <pre><code>npm install</code></pre>
  </li>
</ol>

<h3>Executando o Back-end</h3>

<ol>
  <li>Entre na pasta <code>back</code>:
    <pre><code>cd back</code></pre>
  </li>
  <li>Inicie o servidor do back-end com o comando:
    <pre><code>node server.js</code></pre>
    <p>O servidor estará ativo e aguardando conexões. Certifique-se de que o MongoDB esteja em execução e que as variáveis de conexão ao banco estejam configuradas corretamente.</p>
  </li>
  <li>Volte à pasta principal:
    <pre><code>cd ..</code></pre>
  </li>
</ol>

<h3>Executando o Front-end</h3>

<ol>
  <li>Na pasta principal do projeto, inicie o front-end com o comando:
    <pre><code>npm start</code></pre>
    <p>Isso irá abrir o front-end em desenvolvimento no navegador, geralmente acessível em <a href="http://localhost:3000">http://localhost:3000</a>.</p>
  </li>
</ol>

<h2>🛠️ Funcionalidades</h2>

<p>O projeto oferece uma interface para:</p>
<ul>
  <li>Inserir dados</li>
  <li>Atualizar dados</li>
  <li>Consultar dados</li>
  <li>Excluir dados</li>
  <li>Exportação dos dados para arquvio json</li>
</ul>
<p>Essas operações são realizadas no MongoDB por meio de uma API desenvolvida em Node.js e um front-end em React.</p>

<h2>📋 Tecnologias Utilizadas</h2>

<ul>
  <li><strong>Back-end</strong>: Node.js, Express, Mongoose (para conexão com MongoDB)</li>
  <li><strong>Front-end</strong>: React, Axios (para requisições HTTP)</li>
  <li><strong>Banco de Dados</strong>: MongoDB</li>
</ul>
