import React, { useState, FormEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../Services/api";

import logoImg from "../../assets/logo.svg";

import { Title, Form, Repositories, Error } from "./style";
import { FiChevronRight } from "react-icons/fi";

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState("");
  const [inputError, setInputError] = useState("");
  const [respositories, setRepositories] = useState<Repository[]>(() => {
    const storageRepository = localStorage.getItem(
      "@GitHubExplorer:repositories"
    );

    if (storageRepository) {
      return JSON.parse(storageRepository);
    } else {
      return [];
    }
  });

  async function handleSubmitForm(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    if (!newRepo) {
      setInputError("Por favor, digite o nome/repo do github");
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);
      const repository = await response.data;
      setRepositories([...respositories, repository]);
      setNewRepo("");
      setInputError("");
    } catch (err) {
      setInputError("Error, não foi possível encontrar o repositório");
    }
  }

  useEffect(() => {
    localStorage.setItem(
      "@GitHubExplorer:repositories",
      JSON.stringify(respositories)
    );
  }, [respositories]);

  return (
    <>
      <img src={logoImg} alt="Logo: GitHub Explorer" />
      <Title>Explore repositórios no GitHub</Title>

      <Form hasError={!!inputError} onSubmit={handleSubmitForm}>
        <input
          type="text"
          placeholder="Digite o nome do repositório"
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {respositories.map((repo) => (
          <Link key={repo.full_name} to={`/repository/${repo.full_name}`}>
            <img src={repo.owner.avatar_url} alt={repo.owner.login} />

            <div>
              <strong>{repo.full_name}</strong>
              <p>{repo.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
