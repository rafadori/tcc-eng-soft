import express from "express"; // Importa o framework Express para criar um servidor web.
import userRoutes from "./routes/users.js"; // Importa as rotas de usuários definidas em outro arquivo.
import cors from "cors"; // Importa o middleware CORS para permitir solicitações de diferentes origens.

const app = express(); // Cria uma instância do aplicativo Express.

app.use(express.json()); // Configura o aplicativo para analisar solicitações JSON. Isso permite que o servidor entenda e processe dados JSON enviados no corpo das requisições.
app.use(cors()); // Configura o aplicativo para usar o middleware CORS, permitindo que o servidor aceite requisições de diferentes origens.

app.use("/", userRoutes); // Usa as rotas de usuários para qualquer solicitação no caminho raiz ("/"). Isso significa que qualquer rota definida no arquivo "users.js" será acessível a partir do caminho raiz do servidor.

app.listen(8800); // Faz o servidor ouvir na porta 8800. Qualquer solicitação para esta porta será tratada pelo servidor Express.
