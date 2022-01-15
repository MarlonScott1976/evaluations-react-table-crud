import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Edit from "./Edit";
import Home from "./Home";
import { ALL_USERS_QUERY } from './queries';
import "./App.css";




/* App component -- API data */

function App() {
  const { loading, error, data } = useQuery(ALL_USERS_QUERY);
  console.log(data);

  if (loading) {
    return <p>Loading...</p>;
  }

/* Route path from parent to children */

  return (
    <Routes>
      <Route path="/" element={<Home users={data.allUsers} />} />
      <Route path="/Edit/:id" element={<Edit users={data.allUsers} />} />
    </Routes>
  );
}

export default App;