import React, { useState, useCallback } from "react";
import { FaGithub, FaPlus, FaSpinner } from "react-icons/fa";
import { Container, Form, SubmitButton } from "./styles";
import api from "~/services/api";
import { RepositoryModel } from "~/models";

const Home = () => {
  const [repository, setRepository] = useState("");
  const [repositories, setRepositories] = useState<RepositoryModel[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      const submit = async (): Promise<void> => {
        if (!repository || repository.length === 0) {
          return;
        }

        setLoading(true);

        try {
          const data = (await api.get<RepositoryModel>(`/repos/${repository}`))
            .data;

          setRepositories([...repositories, data]);
          setRepository("");
        } catch (err) {
        } finally {
          setLoading(false);
        }
      };

      event.preventDefault();
      submit();
    },
    [repositories, repository]
  );

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={repository}
          onChange={(e) => setRepository(e.target.value)}
          placeholder="Adicionar repositórios"
        />
        <SubmitButton loading={loading}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#FFF" size={14} />
          )}
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default Home;
