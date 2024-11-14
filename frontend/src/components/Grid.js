import React from "react"; // Importa a biblioteca React.
import axios from "axios"; // Importa a biblioteca axios para fazer requisições HTTP.
import styled from "styled-components"; // Importa a biblioteca styled-components para criar componentes estilizados.
import { FaTrash, FaEdit } from "react-icons/fa"; // Importa os ícones FaTrash e FaEdit da biblioteca react-icons.
import { toast } from "react-toastify"; // Importa a função toast para exibir notificações.

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`; // Estiliza a tabela com styled-components.

export const Thead = styled.thead``; // Estiliza o cabeçalho da tabela.

export const Tbody = styled.tbody``; // Estiliza o corpo da tabela.

export const Tr = styled.tr``; // Estiliza as linhas da tabela.

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`; // Estiliza as células do cabeçalho da tabela e oculta elementos em telas pequenas, se aplicável.

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`; // Estiliza as células do corpo da tabela e oculta elementos em telas pequenas, se aplicável.

const IconButton = styled.div`
  cursor: pointer;
  &:hover {
    color: #007bff; /* Cor do efeito hover */
  }
`; // Estiliza os ícones de botão para adicionar um efeito de hover.

const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item); // Define o item a ser editado.
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id) // Faz uma requisição DELETE para o servidor.
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id); // Filtra a lista de usuários, removendo o usuário deletado.

        setUsers(newArray); // Atualiza o estado dos usuários.
        toast.success(data); // Exibe uma notificação de sucesso.
      })
      .catch(({ data }) => toast.error(data)); // Exibe uma notificação de erro.

    setOnEdit(null); // Reseta o estado de edição.
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th onlyWeb>Email</Th>
          <Th onlyWeb>Telefone</Th>
          <Th>Apartamento</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td width="25%">{item.nome}</Td>
            <Td width="25%" onlyWeb>{item.email}</Td>
            <Td width="20%" onlyWeb>
              {item.fone}
            </Td>
            <Td width="20%">{item.apartamento}</Td>
            <Td alignCenter width="5%">
              <IconButton>
                <FaEdit onClick={() => handleEdit(item)} />
              </IconButton>
            </Td>
            <Td alignCenter width="5%">
              <IconButton>
                <FaTrash onClick={() => handleDelete(item.id)} />
              </IconButton>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid; // Exporta o componente Grid como padrão.
