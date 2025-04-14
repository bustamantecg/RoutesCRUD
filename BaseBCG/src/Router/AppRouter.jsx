import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ItemList from '../pages/ItemList';
import ItemDetail from '../pages/ItemDetail';
import ItemCreate from '../pages/ItemCreate';
import ItemEdit from '../pages/ItemEdit';
import NotFound from '../pages/NotFound';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="text-center mt-10 space-y-4">
            <h1 className="text-2xl">Bienvenido a BaseBCG</h1>
            <Link to="/items" className="btn btn-primary">
              Ir a lista de artículos
            </Link>
          </div>
        }
        />
        <Route path="/items" element={<ItemList />} />
        <Route path="/items/create" element={<ItemCreate />} />
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="/items/:id/edit" element={<ItemEdit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
