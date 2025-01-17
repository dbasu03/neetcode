import React, { useEffect, useState } from 'react';
import { fetchProblems } from '../services/api';

const Home = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    fetchProblems()
      .then((res) => setProblems(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Problems</h1>
      <ul>
        {problems.map((problem) => (
          <li key={problem.id}>{problem.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
