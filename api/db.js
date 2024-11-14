import mysql from "mysql"; // Importa a biblioteca mysql para interagir com o banco de dados MySQL.
import 'dotenv/config'; // Importa e configura a biblioteca dotenv para carregar variáveis de ambiente do arquivo .env.

const hostDB = process.env.DB_HOST; // Obtém o valor da variável de ambiente DB_HOST para o host do banco de dados.
const userDB = process.env.DB_USER; // Obtém o valor da variável de ambiente DB_USER para o usuário do banco de dados.
const passwordDB = process.env.DB_PASSWORD; // Obtém o valor da variável de ambiente DB_PASSWORD para a senha do banco de dados.
const databaseDB = process.env.DB_DATABASE; // Obtém o valor da variável de ambiente DB_DATABASE para o nome do banco de dados.

export const db = mysql.createConnection({
    host: hostDB,
    user: userDB,
    password: passwordDB,
    database: databaseDB
}); // Cria e exporta uma conexão com o banco de dados MySQL usando os valores das variáveis de ambiente.
