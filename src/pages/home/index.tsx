import React, { useState, useEffect } from "react";
import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Container, DeleteButton, Form, List, SubmitButton } from "./styles";
import api from "~/services/api";
import storage from "~/services/storage";
import { RepositoryModel } from "~/models";

const Home = () => {
  const [repository, setRepository] = useState("");
  const [repositories, setRepositories] = useState<RepositoryModel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedRepositories = storage.get<RepositoryModel[]>("repositories");
    savedRepositories && setRepositories(savedRepositories);
  }, []);

  useEffect(() => {
    const hasRepositories = repositories?.length > 0;
    hasRepositories && storage.save("repositories", repositories);
  }, [repositories]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const isValidRepo = repository?.trim().length > 0;

    if (!isValidRepo) {
      return;
    }

    const alreadyExists = repositories.find(
      ({ full_name }) => full_name === repository
    );

    if (alreadyExists) {
      toast.info(`Repositório "${repository}" já foi adicionado`);
      setRepository("");

      return;
    }

    setLoading(true);

    api
      .get<RepositoryModel>(`/repos/${repository}`)
      .then((response) => setRepositories([...repositories, response.data]))
      .catch(() => toast.error(`Repositório "${repository}" não encontrado`))
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

            <Link to={`repository/${item.full_name.replace("/", "-")}`}>
              <FaBars size={20} />
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
};

export default Home;
