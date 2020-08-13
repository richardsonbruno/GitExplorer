import React from "react";

import logoImg from "../../assets/logo.svg";

import { Title, Form, Repositories } from "./style";

const Dashboard: React.FC = () => (
  <>
    <img src={logoImg} alt="Logo: GitHub Explorer" />
    <Title>Explore repositórios no GitHub</Title>

    <Form>
      <input type="text" placeholder="Digite o nome do repositório" />
      <button type="submit">Pesquisar</button>
    </Form>

    <Repositories></Repositories>
  </>
);

export default Dashboard;
