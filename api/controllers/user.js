import { db } from "../db.js"; // Importa a conexão com o banco de dados a partir do módulo db.js.

export const getUsers = (_, res) => {
  const q = "SELECT * FROM moradores"; // Define a query SQL para selecionar todos os moradores.

  db.query(q, (err, data) => {
    if (err) return res.json(err); // Se houver um erro, retorna o erro como resposta JSON.

    return res.status(200).json(data); // Caso contrário, retorna os dados obtidos como resposta JSON com status 200 (OK).
  });
}; // Exporta a função getUsers, que obtém todos os moradores do banco de dados.

export const addUser = (req, res) => {
  const q =
    "INSERT INTO moradores(`nome`, `email`, `fone`, `apartamento`) VALUES(?)"; // Define a query SQL para inserir um novo morador.

  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.apartamento,
  ]; // Coleta os valores a serem inseridos a partir do corpo da requisição.

  db.query(q, [values], (err) => {
    if (err) return res.json(err); // Se houver um erro, retorna o erro como resposta JSON.

    return res.status(200).json("Morador adicionado com sucesso."); // Caso contrário, retorna uma mensagem de sucesso como resposta JSON com status 200 (OK).
  });
}; // Exporta a função addUser, que adiciona um novo morador ao banco de dados.

export const updateUser = (req, res) => {
  const q =
    "UPDATE moradores SET `nome` = ?, `email` = ?, `fone` = ?, `apartamento` = ? WHERE `id` = ?"; // Define a query SQL para atualizar um morador existente.

  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.apartamento,
  ]; // Coleta os valores a serem atualizados a partir do corpo da requisição.

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err); // Se houver um erro, retorna o erro como resposta JSON.

    return res.status(200).json("Morador atualizado com sucesso."); // Caso contrário, retorna uma mensagem de sucesso como resposta JSON com status 200 (OK).
  });
}; // Exporta a função updateUser, que atualiza os dados de um morador existente no banco de dados.

export const deleteUser = (req, res) => {
  const q = "DELETE FROM moradores WHERE `id` = ?"; // Define a query SQL para deletar um morador.

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err); // Se houver um erro, retorna o erro como resposta JSON.

    return res.status(200).json("Morador deletado com sucesso."); // Caso contrário, retorna uma mensagem de sucesso como resposta JSON com status 200 (OK).
  });
}; // Exporta a função deleteUser, que deleta um morador do banco de dados.
