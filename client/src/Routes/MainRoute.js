import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import Rigister from '../components/Rigister/Rigister';
import Login from '../components/Login/Login';
import Home from '../components/Home/Home';
import Errorpage from '../components/Home/Errorpage';
import Profile from '../components/Home/Profile';

import ProtectedRoutes from './ProtectedRoutes';

function MainRoute() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/rigister" element={<Rigister />} />
      <Route path="/home" element={<Home />} />
      {/* <ProtectedRoutes/> */}
      <Route path="/profile" element={<Profile />} />

      <Route path="*" element={<Errorpage />} />
    </Routes>
  );
}

export default MainRoute;
