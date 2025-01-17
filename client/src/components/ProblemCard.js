import React from 'react';
import { Link } from 'react-router-dom';

const ProblemCard = ({ problem }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '1rem', margin: '1rem', borderRadius: '8px' }}>
      <h3>{problem.title}</h3>
      <p>Difficulty: {problem.difficulty}</p>
      <Link to={`/problem/${problem.id}`}>View Problem</Link>
    </div>
  );
};

export default ProblemCard;
