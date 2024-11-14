import GlobalStyle from "./styles/global"; // Importa estilos globais.
import styled from "styled-components"; // Importa a biblioteca styled-components para criar componentes estilizados.
import Form from "./components/Form.js"; // Importa o componente de formulário.
import Grid from "./components/Grid"; // Importa o componente de grade.
import { useEffect, useState } from "react"; // Importa hooks useEffect e useState do React.
import { toast, ToastContainer } from "react-toastify"; // Importa funções para exibir notificações.
import "react-toastify/dist/ReactToastify.css"; // Importa estilos do React Toastify.
import axios from "axios"; // Importa a biblioteca axios para fazer requisições HTTP.

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`; // Cria um componente Container estilizado.

const Title = styled.h2``; // Cria um componente Title estilizado.

function App() {
  const [users, setUsers] = useState([]); // Define o estado inicial para a lista de usuários.
  const [onEdit, setOnEdit] = useState(null); // Define o estado inicial para o usuário em edição.

  const getUsers = async () => {
    // Função assíncrona para obter usuários.
    try {
      const res = await axios.get("http://localhost:8800"); // Faz uma requisição GET para o servidor.
      setUsers(
        res.data.sort((a, b) => {
          // Ordena os usuários por apartamento e nome.
          if (a.apartamento > b.apartamento) return 1;
          if (a.apartamento < b.apartamento) return -1;
          if (a.nome > b.nome) return 1;
          if (a.nome < b.nome) return -1;
          return 0;
        })
      );
    } catch (error) {
      toast.error(error); // Exibe uma notificação de erro em caso de falha.
    }
  };

  useEffect(() => {
    // Hook que executa a função getUsers ao montar o componente.
    getUsers();
  }, [setUsers]); // O array de dependências garante que a função é executada apenas quando setUsers é alterado.

  return (
    <>
      <Container>
        <Title>Moradores</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} /> 
        {/* Renderiza o componente Form e passa os props onEdit, setOnEdit e getUsers */}
        <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
        {/* Renderiza o componente Grid e passa os props setOnEdit, users e setUsers */}
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      {/* Configura o ToastContainer para exibir notificações */}
      <GlobalStyle /> 
      {/* Aplica os estilos globais */}
    </>
  );
}

export default App; // Exporta o componente App como padrão.
