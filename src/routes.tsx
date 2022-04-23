import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "~/pages/home";
import Repository from "~/pages/repository";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="repository/:name" element={<Repository />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
