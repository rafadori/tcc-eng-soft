import express from "express"; // Importa o framework Express para criar um servidor web.
import { addUser, deleteUser, getUsers, updateUser } from "../controllers/user.js"; // Importa os controladores de usuário que contêm a lógica para cada rota.

const router = express.Router(); // Cria um roteador do Express para definir as rotas do aplicativo.

router.get("/", getUsers); // Define uma rota GET na raiz ("/") que chama a função getUsers para obter todos os usuários.

router.post("/", addUser); // Define uma rota POST na raiz ("/") que chama a função addUser para adicionar um novo usuário.

router.put("/:id", updateUser); // Define uma rota PUT na raiz ("/:id") que chama a função updateUser para atualizar um usuário específico pelo ID.

router.delete("/:id", deleteUser); // Define uma rota DELETE na raiz ("/:id") que chama a função deleteUser para deletar um usuário específico pelo ID.

export default router; // Exporta o roteador para que possa ser usado em outras partes do aplicativo.
