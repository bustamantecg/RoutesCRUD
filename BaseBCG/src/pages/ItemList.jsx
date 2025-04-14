import { useItems } from "../context/ItemContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ItemCard from "../components/ItemCard";

const ItemList = () => {
  const { items, loading } = useItems();

  if (loading) return <p className="text-center mt-10"><span className="loading loading-infinity loading-xl text-secondary"></span> Cargando artículos <span className="loading loading-infinity loading-xl text-secondary"></span></p>;

  return (
    <motion.div 
      className="max-w-6xl mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Listado de Artículos</h1>
        <Link to="/items/create">
          <button className="btn btn-sm btn-outline btn-primary"><i class="bi bi-cloud-plus-fill"></i> Nuevo Artículo</button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-gradient-to-r from-[#0f172a]  to-[#334155]">
        {items.length > 0 ? (
          items.map(item => (
            <ItemCard key={item.id} item={item} />
          ))
        ) : (
          <p>No hay artículos registrados.</p>
        )}
      </div>
    </motion.div>
  );
};

export default ItemList;
