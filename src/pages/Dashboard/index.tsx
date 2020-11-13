import React, { useEffect, useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import {
  Title, Form, Repositories, Error,
} from './styles';
import logo from '../../assets/logo.svg';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem('@GithubExplorer:repositories');

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }

    return [];
  });
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories));
  }, [repositories]);

  async function handleAddRepository(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    if (!searchTerm) {
      setInputError('Type the author/repository name');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${searchTerm}`);

      const repository = response.data;

      setRepositories([...repositories, repository]);
      setSearchTerm('');
      setInputError('');
    } catch (err) {
      setInputError('Search failed to find any repositories.');
    }
  }

  return (
    <>
      <img src={logo} alt="Github explorer" />
      <Title>Explore Github repositories</Title>

      <Form onSubmit={handleAddRepository} hasError={!!inputError}>
        <input
          value={searchTerm}
          placeholder="Type the name of the repository"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map((repo) => (
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
