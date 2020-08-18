import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { Header } from "./style";
import { FiChevronsLeft } from "react-icons/fi";

import logoImg from "../../assets/logo.svg";

interface RepositoriesParams {
  repositories: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoriesParams>();

  return (
    <Header>
      <img src={logoImg} />

      <Link to="/">
        <FiChevronsLeft size={16} />
        Voltar
      </Link>
    </Header>
  );
};

export default Repository;
