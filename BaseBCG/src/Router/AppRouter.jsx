import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ItemList from '../pages/ItemList';
import ItemDetail from '../pages/ItemDetail';
import ItemCreate from '../pages/ItemCreate';
import ItemEdit from '../pages/ItemEdit';
import NotFound from '../pages/NotFound';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1 className="text-center text-2xl mt-10">Bienvenido a BaseBCG</h1>} />
        <Route path="/items" element={<ItemList />} />
        <Route path="/items/create" element={<ItemCreate />} />
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="/items/:id/edit" element={<ItemEdit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
