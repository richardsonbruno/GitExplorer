import React, { useEffect, useState } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { Header, RepositoryInfo, Issue } from "./style";
import { FiChevronsLeft, FiChevronRight } from "react-icons/fi";

import api from "../../Services/api";

import logoImg from "../../assets/logo.svg";

interface RepositoriesParams {
  repositories: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoriesParams>();

  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    api.get(`repos/${params.repositories}`).then((response) => {
      setRepository(response.data);
    });

    api.get(`repos/${params.repositories}/issues`).then((response) => {
      setIssues(response.data);
    });
  }, [params.repositories]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="GitHub Explorer Logo" />

        <Link to="/">
          <FiChevronsLeft size={16} />
          Voltar
        </Link>
      </Header>

      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>

            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>

            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      {issues && (
        <Issue>
          {issues.map((issue) => (
            <a key={issue.id} href={issue.html_url} target="_blank">
              <div>
                <strong>{issue.title}</strong>
                <p>{issue.user.login}</p>
              </div>

              <FiChevronRight size={20} />
            </a>
          ))}
        </Issue>
      )}
    </>
  );
};

export default Repository;
