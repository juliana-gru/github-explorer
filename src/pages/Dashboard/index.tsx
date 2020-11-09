import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, Repositories } from './styles';
import logo from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logo} alt="Github explorer" />  
      <Title>Explore Github repositories</Title>

      <Form>
        <input placeholder="Type the name of the repository" />
        <button type="submit">Search</button>
      </Form>

      <Repositories>
        <a href="test">
          <img src="https://avatars2.githubusercontent.com/u/52481040?s=460&u=d023ad3a0bc0f02bdc7ea18085f5875ba9ba98e0&v=4" alt="Juliana Grutzmann"></img>
          
          <div>
            <strong>Unform</strong>
            <p>Easy peasy highly scalable.</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  )
}


export default Dashboard;