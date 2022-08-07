import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IssueModel, RepositoryModel } from "~/models";
import api from "~/services/api";

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

  return (
    <div
      style={{
        color: "white",
      }}
    >
      <p>Repositório: {repository?.full_name}</p>
      <p>Issues: {(issues ?? []).length}</p>
    </div>
  );
};

export default Repository;
