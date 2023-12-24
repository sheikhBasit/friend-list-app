import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import GetUser from './components/Get';
import UserForm from './components/Post';
import UpdateUser from './components/Update';
import DeleteUser from './components/Delete';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<GetUser />} />
            <Route path="/post" element={<UserForm />} />
            <Route path="/update" element={<UpdateUser />} />
            <Route path="/delete" element={<DeleteUser />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
