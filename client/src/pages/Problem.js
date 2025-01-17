import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProblem } from '../services/api';

const Problem = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    fetchProblem(id)
      .then((res) => setProblem(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!problem) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{problem.title}</h1>
      <p>{problem.description}</p>
      <h3>Examples:</h3>
      <ul>
        {problem.examples.map((example, index) => (
          <li key={index}>
            <pre>{example}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Problem;
