import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import EditTask from './components/Tasks/EditTask';
import { GlobalProvider } from './context/GlobalContext';

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/edit/:id" element={<EditTask />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;