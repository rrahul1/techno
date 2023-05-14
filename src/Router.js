import React from 'react';
import {Route, Routes} from "react-router-dom";
import UserData from './components/UserData';
import SingleUser from './components/SingleUser';

function Router() {
  return (
    <Routes>
        <Route path="/" element={<UserData />} />
        <Route path="/user-data/:id" element={<SingleUser />} />
    </Routes>
  )
}

export default Router