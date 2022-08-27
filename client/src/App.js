import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Apps from './Components/Apps';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer'
import Search from './Components/Search';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminDashboard from './Components/Admin/AdminDashboard';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:id' element={<Apps />} />
          <Route path='/search' element={<Search />} />
          <Route path='/admin' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/*' element={<h1>Page Not Found</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
