import React   from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';

function App() {
  return (
    <div className="container">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<ContactList/>}
        />
        <Route
          path="/cadastro"
          element={<AddContact/>}
        />
      </Routes>
    </div>
  );
}

export default App;
