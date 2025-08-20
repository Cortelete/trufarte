
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import FlavorDetailPage from './pages/FlavorDetailPage';
import EncomendasPage from './pages/EncomendasPage';

function App(): React.ReactNode {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="cardapio" element={<MenuPage />} />
        <Route path="cardapio/:flavorId" element={<FlavorDetailPage />} />
        <Route path="encomendas" element={<EncomendasPage />} />
      </Route>
    </Routes>
  );
}

export default App;
