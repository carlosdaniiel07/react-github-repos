import React from "react";
import { FaGithub, FaPlus } from "react-icons/fa";
import { Container, Form, SubmitButton } from "./styles";

const Home = () => (
  <Container>
    <h1>
      <FaGithub size={25} />
      Meus repositórios
    </h1>

    <Form onSubmit={() => {}}>
      <input type="text" placeholder="Adicionar repositórios" />
      <SubmitButton>
        <FaPlus color="#FFF" size={14} />
      </SubmitButton>
    </Form>
  </Container>
);

export default Home;
