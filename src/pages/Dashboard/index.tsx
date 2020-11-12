import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';
import { Title, Form, Repositories } from './styles';
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
  const [repositories, setRepositories] = useState<Repository[]>([]);

  async function handleAddRepository(e: FormEvent<HTMLFormElement>,): Promise<void> {
    e.preventDefault();
    const response = await api.get<Repository>(`repos/${searchTerm}`);

    const repository = response.data;

    setRepositories([...repositories, repository]);
    setSearchTerm('');
  }
  
  
  return (
    <>
      <img src={logo} alt="Github explorer" />  
      <Title>Explore Github repositories</Title>

      <Form onSubmit={handleAddRepository}>
        <input 
        value={searchTerm}
        placeholder="Type the name of the repository" onChange={(e) => setSearchTerm(e.target.value)} />
        <button type="submit">Search</button>
      </Form>

      <Repositories>
        {repositories.map(repo => (
          <a key={repo.full_name} href="test">
            <img src={repo.owner.avatar_url} alt={repo.owner.login}></img>
            
            <div>
              <strong>{repo.full_name}</strong>
              <p>{repo.description}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
               
      </Repositories>
    </>
  )
}


export default Dashboard;