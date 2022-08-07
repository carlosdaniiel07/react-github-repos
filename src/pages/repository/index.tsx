import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IssueModel, RepositoryModel } from "~/models";
import api from "~/services/api";
import { BackButton, Container, IssuesList, Loading, Owner } from "./styles";

const Repository = () => {
  const [repository, setRepository] = useState<RepositoryModel>();
  const [issues, setIssues] = useState<IssueModel[]>();
  const [loading, setLoading] = useState(true);

  const { name } = useParams();

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      const repoName = decodeURIComponent(name ?? "");

      setLoading(true);

      try {
        const [repoResponse, issuesResponse] = await Promise.all([
          api.get<RepositoryModel>(`/repos/${repoName}`),
          api.get<IssueModel[]>(`/repos/${repoName}/issues`, {
            params: {
              state: "open",
              per_page: 10,
            },
          }),
        ]);

        setRepository(repoResponse.data);
        setIssues(issuesResponse.data);
      } catch (err) {
        toast.error("Ocorreu um erro ao carregar os dados do repositório");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [name]);

  return loading ? (
    <Loading>
      <h1>Carregando...</h1>
    </Loading>
  ) : (
    <Container>
      <BackButton to="/">
        <FaArrowLeft color="#000" size={30} />
      </BackButton>
      <Owner>
        <a href={repository?.html_url} target="_blank" rel="noreferrer">
          <img
            src={repository?.owner?.avatar_url}
            alt={repository?.owner?.login}
            title={repository?.owner?.login}
          />
        </a>

        <h1>{repository?.full_name}</h1>
        <p>{repository?.description}</p>
      </Owner>

      <IssuesList>
        {issues?.map((issue) => (
          <li key={String(issue.id)}>
            <img
              src={issue.user?.avatar_url}
              alt={issue.user?.login}
              title={issue.user?.login}
            />
            <div>
              <strong>
                <a href={issue.html_url} target="_blank" rel="noreferrer">
                  {issue.title}
                </a>
                {issue.labels?.map((label) => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </strong>
              <p>{issue.user?.login}</p>
            </div>
          </li>
        ))}
      </IssuesList>
    </Container>
  );
};

export default Repository;
