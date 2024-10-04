import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {user && <p>Hello, {user.username}!</p>}
    </div>
  );
};

export default Home;