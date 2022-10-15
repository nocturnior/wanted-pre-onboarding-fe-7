import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Todos from '../pages/Todos';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/todo' element={<Todos />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;