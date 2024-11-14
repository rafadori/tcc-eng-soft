import axios from "axios"; // Importa a biblioteca axios para fazer requisições HTTP.
import React, { useEffect, useRef } from "react"; // Importa React e hooks useEffect e useRef.
import styled from "styled-components"; // Importa a biblioteca styled-components para criar componentes estilizados.
import { toast } from "react-toastify"; // Importa a função toast para exibir notificações.

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`; // Cria um componente estilizado para o contêiner do formulário.

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`; // Cria um componente estilizado para as áreas de entrada.

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`; // Cria um componente estilizado para os campos de entrada.

const Label = styled.label``; // Cria um componente estilizado para os rótulos dos campos de entrada.

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
  transition: background-color 0.3s ease, color 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
    color: #f8f9fa;
  }
`; // Cria um componente estilizado para o botão, incluindo estilos de hover e transição.

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef(); // Cria uma referência para acessar diretamente os elementos DOM do formulário.

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome;
      user.email.value = onEdit.email;
      user.fone.value = onEdit.fone;
      user.apartamento.value = onEdit.apartamento;
    }
  }, [onEdit]); // Atualiza os campos do formulário com os dados do usuário em edição quando o onEdit é alterado.

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário de recarregar a página.

    const user = ref.current;

    // Verifica se todos os campos estão preenchidos.
    if (
      !user.nome.value ||
      !user.email.value ||
      !user.fone.value ||
      !user.apartamento.value
    ) {
      return toast.warn("Preencha todos os campos!"); // Exibe uma notificação de aviso.
    }

    // Se há um usuário em edição, faz uma requisição PUT para atualizar os dados.
    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          apartamento: user.apartamento.value,
        })
        .then(({ data }) => toast.success(data)) // Exibe uma notificação de sucesso.
        .catch(({ data }) => toast.error(data)); // Exibe uma notificação de erro.
    } else {
      // Caso contrário, faz uma requisição POST para criar um novo usuário.
      await axios
        .post("http://localhost:8800", {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          apartamento: user.apartamento.value,
        })
        .then(({ data }) => toast.success(data)) // Exibe uma notificação de sucesso.
        .catch(({ data }) => toast.error(data)); // Exibe uma notificação de erro.
    }

    // Limpa os campos do formulário após o envio.
    user.nome.value = "";
    user.email.value = "";
    user.fone.value = "";
    user.apartamento.value = "";

    setOnEdit(null); // Reseta o estado de edição.
    getUsers(); // Atualiza a lista de usuários.
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="fone" />
      </InputArea>
      <InputArea>
        <Label>Apartamento</Label>
        <Input name="apartamento" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form; // Exporta o componente Form como padrão.
