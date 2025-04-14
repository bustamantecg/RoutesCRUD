import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useItems } from "../context/ItemContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { motion } from "framer-motion";

const MySwal = withReactContent(Swal);

const ItemDetail = () => {
  const { id } = useParams();
  const { getItem, deleteItem } = useItems();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getItem(id);
        setItem(data);
      } catch (error) {
        toast.error("Error al cargar el artículo");
      }
    };
    fetchItem();
  }, [id, getItem]);

  const handleDelete = () => {
    MySwal.fire({
      title: "¿Eliminar artículo?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteItem(id);
          toast.success("Artículo eliminado");
          navigate("/items");
        } catch {
          toast.error("Error al eliminar");
        }
      }
    });
  };

  if (!item) return <p className="text-center mt-10">Cargando artículo...</p>;

  return (
    <motion.div 
      className="max-w-2xl mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold mb-4">{item.descripcion}</h1>

      <div className="space-y-2 text-lg text-gray-800">
      <figure>
          <img src={item.imagen} alt={item.nombre} 
          className="rounded-lg mb-4 max-h-80 object-cover mx-auto border-2 border-primary"
          />
        </figure>
        <p><strong>Color:</strong> {item.color}</p>
        <p><strong>Talles:</strong> {item.talles}</p>
        <p><strong>Precio:</strong> ${item.precio}</p>
        <p><strong>Oferta:</strong> {item.oferta ? "Sí" : "No"}</p>
        <p><strong>Publicar:</strong> {item.publicar ? "Sí" : "No"}</p>
        <p><strong>Stock:</strong> {item.stock}</p>
        <p><strong>Creado el:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="flex gap-4 mt-6">
        <Link to={`/items/${id}/edit`} className="btn btn-outline btn-primary">
          Editar
        </Link>
        <button onClick={handleDelete} className="btn btn-outline btn-error">
          Eliminar
        </button>
        <Link to="/items" className="btn btn-outline btn-secondary ml-auto">
          Volver
        </Link>
      </div>
    </motion.div>
  );
};

export default ItemDetail;
