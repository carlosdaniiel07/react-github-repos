import React, { useState } from "react";
import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import { Container, DeleteButton, Form, List, SubmitButton } from "./styles";
import api from "~/services/api";
import { RepositoryModel } from "~/models";

const Home = () => {
  const [repository, setRepository] = useState("");
  const [repositories, setRepositories] = useState<RepositoryModel[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const isValidRepository = repository?.trim().length > 0;

    if (!isValidRepository) {
      return;
    }

    setLoading(true);

    api
      .get<RepositoryModel>(`/repos/${repository}`)
      .then((response) => setRepositories([...repositories, response.data]))
      .finally(() => {
        setLoading(false);
        setRepository("");
      });
  };

  const handleDelete = (index: number): void => {
    const newRepos = [...repositories];
    newRepos.splice(index, 1);
    setRepositories(newRepos);
  };

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

      <List>
        {repositories.map((item, index) => (
          <li key={`repo-${index}`}>
            <div>
              <DeleteButton onClick={() => handleDelete(index)}>
                <FaTrash size={14} />
              </DeleteButton>
              <span>{item.full_name}</span>
            </div>

            <a href="">
              <FaBars size={20} />
            </a>
          </li>
        ))}
      </List>
    </Container>
  );
};

export default Home;
